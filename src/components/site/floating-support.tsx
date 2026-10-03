import { useEffect, useRef, useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp, Bot, Check, LoaderCircle, MessageCircle, Phone, Send } from "lucide-react";
import WhatsappIconIcon from "@iconify-react/logos/whatsapp-icon";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { chatContent, company } from "@/data/site";
import { submitQuote, type QuoteInput } from "@/lib/quote.functions";
import logo from "@/assets/logo.png";
import { useQuote } from "./quote-context";

type ChatMessage = { id: number; sender: "bot" | "visitor"; text: string };
type QuoteStage = "name" | "phone" | "service" | "date" | null;

const firstMessage: ChatMessage = { id: 0, sender: "bot", text: chatContent.welcome };

function answerFor(message: string) {
  const text = message.toLowerCase();
  if (/service|clean|deep|move|office|home/.test(text)) return chatContent.answers.services;
  if (/price|cost|qar|how much|pricing/.test(text)) return chatContent.answers.pricing;
  if (/area|where|location|doha|cover/.test(text)) return chatContent.answers.areas;
  if (/hour|open|time|today|same.day/.test(text)) return chatContent.answers.hours;
  if (/book|schedule|appointment|available/.test(text)) return chatContent.answers.booking;
  if (/pay|payment|card|cash|transfer/.test(text)) return chatContent.answers.payment;
  return chatContent.answers.default;
}

export function FloatingSupport({ showTop }: { showTop: boolean }) {
  const sendQuote = useServerFn(submitQuote);
  const { requestQuote } = useQuote();
  const [chatOpen, setChatOpen] = useState(false);
  const [teaserOpen, setTeaserOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([firstMessage]);
  const [messageText, setMessageText] = useState("");
  const [quoteStage, setQuoteStage] = useState<QuoteStage>(null);
  const [quoteDraft, setQuoteDraft] = useState<Partial<QuoteInput>>({});
  const [sending, setSending] = useState(false);
  const messageId = useRef(1);
  const messageList = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatOpen) return;
    let alreadyShown = false;
    try {
      alreadyShown = sessionStorage.getItem("nature-best-chat-teaser") === "shown";
    } catch {
      alreadyShown = true;
    }
    if (alreadyShown) return;

    const timer = window.setTimeout(() => {
      setTeaserOpen(true);
      try {
        sessionStorage.setItem("nature-best-chat-teaser", "shown");
      } catch {
        setTeaserOpen(false);
      }
    }, 8000);
    return () => window.clearTimeout(timer);
  }, [chatOpen]);

  useEffect(() => {
    if (messageList.current) messageList.current.scrollTop = messageList.current.scrollHeight;
  }, [messages, sending]);

  const appendMessage = (sender: ChatMessage["sender"], text: string) => {
    setMessages((current) => [...current, { id: messageId.current++, sender, text }]);
  };

  const beginQuote = () => {
    setQuoteDraft({});
    setQuoteStage("name");
    appendMessage("bot", chatContent.quotePrompts.name);
  };

  const talkToHuman = () => {
    const url = new URL(company.whatsappUrl);
    url.searchParams.set("text", "Hello Nature's Best Cleaning, I'd like to speak with your team.");
    window.open(url.toString(), "_blank", "noopener,noreferrer");
  };

  const chooseQuickReply = (reply: string) => {
    setTeaserOpen(false);
    appendMessage("visitor", reply);
    if (reply === "Get a Quote" || reply === "Book a Cleaning") {
      beginQuote();
      return;
    }
    if (reply === "Talk to a Human") {
      appendMessage(
        "bot",
        "Of course. I'll open WhatsApp so you can speak with our team directly.",
      );
      talkToHuman();
      return;
    }
    if (reply === "Contact Us") {
      appendMessage(
        "bot",
        `Call ${company.phone} or WhatsApp ${company.whatsapp}. We're based in ${company.location}.`,
      );
      return;
    }
    appendMessage("bot", answerFor(reply));
  };

  const submitMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = messageText.trim();
    if (!value || sending) return;
    setMessageText("");
    appendMessage("visitor", value);

    if (!quoteStage) {
      appendMessage("bot", answerFor(value));
      return;
    }

    if (quoteStage === "name") {
      if (value.length < 2) {
        appendMessage("bot", "Please enter your name so our team knows who to contact.");
        return;
      }
      setQuoteDraft((current) => ({ ...current, fullName: value }));
      setQuoteStage("phone");
      appendMessage("bot", chatContent.quotePrompts.phone);
      return;
    }

    if (quoteStage === "phone") {
      if (value.replace(/\D/g, "").length < 6) {
        appendMessage(
          "bot",
          "Please enter a valid phone or WhatsApp number, including the country code if possible.",
        );
        return;
      }
      setQuoteDraft((current) => ({ ...current, phone: value }));
      setQuoteStage("service");
      appendMessage("bot", chatContent.quotePrompts.service);
      return;
    }

    if (quoteStage === "service") {
      setQuoteDraft((current) => ({ ...current, service: value }));
      setQuoteStage("date");
      appendMessage("bot", chatContent.quotePrompts.date);
      return;
    }

    const data: QuoteInput = {
      fullName: quoteDraft.fullName ?? "",
      phone: quoteDraft.phone ?? "",
      service: quoteDraft.service,
      preferredDate: value,
      source: "chatbot",
      honeypot: "",
    };
    setSending(true);
    try {
      await sendQuote({ data });
      appendMessage("bot", chatContent.quotePrompts.success);
      setQuoteStage(null);
      setQuoteDraft({});
    } catch {
      appendMessage("bot", chatContent.quotePrompts.error);
    } finally {
      setSending(false);
    }
  };

  const closeChat = (open: boolean) => {
    setChatOpen(open);
    if (open) {
      setTeaserOpen(false);
      try {
        sessionStorage.setItem("nature-best-chat-teaser", "shown");
      } catch {
        setTeaserOpen(false);
      }
    }
  };

  return (
    <>
      <div className="fixed right-5 bottom-6 z-40 hidden lg:block">
        <a
          href={company.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="group relative flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lift animate-soft-pulse transition-transform hover:scale-105"
        >
          <WhatsappIconIcon height="1.5em" />
          <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-navy-deep px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            Chat with us
          </span>
        </a>
      </div>

      {showTop ? (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="fixed bottom-7 left-6 z-40 hidden size-11 items-center justify-center rounded-full border border-gold/50 bg-card text-navy shadow-soft transition-colors hover:bg-gold hover:text-accent-foreground lg:flex"
        >
          <ArrowUp className="size-5" />
        </button>
      ) : null}

      <Dialog open={chatOpen} onOpenChange={closeChat}>
        <DialogContent className="fixed inset-0 z-50 flex h-dvh max-w-none translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden rounded-none border-0 bg-ivory p-0 text-navy shadow-lift [&>button]:text-white sm:inset-auto sm:right-6 sm:bottom-24 sm:left-auto sm:top-auto sm:h-[min(680px,calc(100dvh-8rem))] sm:w-[min(420px,calc(100vw-3rem))] sm:max-w-105 sm:translate-x-0 sm:translate-y-0 sm:rounded-3xl sm:border sm:border-gold/30">
          <DialogHeader className="shrink-0 bg-navy px-5 py-4 pr-14 text-left">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-white p-1.5">
                <img src={logo} alt="" className="size-full object-contain" />
              </span>
              <span>
                <DialogTitle className="font-display text-lg text-white">Nature's Best</DialogTitle>
                <DialogDescription className="mt-1 flex items-center gap-1.5 text-xs text-white/75">
                  <span className="size-1.5 rounded-full bg-leaf" /> Online · usually replies
                  quickly
                </DialogDescription>
              </span>
            </div>
          </DialogHeader>

          <div
            ref={messageList}
            role="log"
            aria-live="polite"
            aria-label="Chat conversation"
            className="flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-5"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "visitor" ? "justify-end" : "justify-start"}`}
              >
                <p
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    message.sender === "visitor"
                      ? "rounded-br-sm bg-navy text-white"
                      : "rounded-bl-sm border border-gold/20 bg-white text-navy shadow-sm"
                  }`}
                >
                  {message.text}
                </p>
              </div>
            ))}
            {sending ? (
              <div className="flex items-center gap-2 text-xs text-muted-foreground" role="status">
                <LoaderCircle className="size-4 animate-spin" /> Sending your quote request…
              </div>
            ) : null}
          </div>

          {!quoteStage ? (
            <div className="shrink-0 border-t border-gold/20 bg-white px-4 py-3 sm:px-5">
              <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Quick replies
              </p>
              <div className="flex flex-wrap gap-2">
                {chatContent.quickReplies.map((reply) => (
                  <button
                    key={reply}
                    type="button"
                    onClick={() => chooseQuickReply(reply)}
                    className="rounded-full border border-gold/40 bg-cream px-3 py-1.5 text-xs font-medium text-navy transition-colors hover:border-gold hover:bg-gold/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <form
            onSubmit={submitMessage}
            className="flex shrink-0 items-center gap-2 border-t border-border bg-white p-3 sm:p-4"
          >
            <label htmlFor="chat-message" className="sr-only">
              {quoteStage ? `Enter your ${quoteStage}` : "Write a message"}
            </label>
            <input
              id="chat-message"
              value={messageText}
              onChange={(event) => setMessageText(event.target.value)}
              placeholder={quoteStage ? `Your ${quoteStage}…` : "Write a message…"}
              autoComplete="off"
              disabled={sending}
              className="h-11 min-w-0 flex-1 rounded-full border border-border bg-cream px-4 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!messageText.trim() || sending}
              aria-label={quoteStage === "date" ? "Send quote request" : "Send message"}
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gold text-navy transition-colors hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-50"
            >
              {quoteStage === "date" ? <Check className="size-5" /> : <Send className="size-4" />}
            </button>
          </form>
        </DialogContent>
      </Dialog>

      <AnimatePresence>
        {teaserOpen && !chatOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            className="fixed right-5 bottom-[calc(11.5rem+env(safe-area-inset-bottom))] z-40 flex max-w-[16rem] items-start gap-3 rounded-2xl border border-gold/30 bg-white p-4 pr-10 text-sm text-navy shadow-lift lg:right-6 lg:bottom-44"
          >
            <Bot className="mt-0.5 size-5 shrink-0 text-gold" />
            <span>Need a quick quote? 👋</span>
            <button
              type="button"
              aria-label="Dismiss chat prompt"
              onClick={() => setTeaserOpen(false)}
              className="absolute top-2 right-2 flex size-6 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
            >
              <span aria-hidden>×</span>
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => closeChat(true)}
        aria-label="Open chat support"
        aria-haspopup="dialog"
        aria-expanded={chatOpen}
        className="fixed right-5 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] z-40 flex size-14 items-center justify-center rounded-full border border-gold/60 bg-navy text-gold shadow-lift transition-transform hover:scale-105 lg:right-6 lg:bottom-24"
      >
        <MessageCircle className="size-6" />
      </button>

      <nav
        aria-label="Quick contact actions"
        className="fixed inset-x-0 bottom-0 z-40 grid h-[calc(4.25rem+env(safe-area-inset-bottom))] grid-cols-3 border-t border-gold/20 bg-white/95 px-2 pt-1 pb-[env(safe-area-inset-bottom)] shadow-[0_-6px_24px_-18px_rgba(11,31,75,0.45)] backdrop-blur lg:hidden"
      >
        <a
          href={company.phoneHref}
          className="flex flex-col items-center justify-center gap-1 text-navy transition-colors hover:text-gold"
        >
          <Phone className="size-5" />
          <span className="text-[0.65rem] font-semibold">Call</span>
        </a>
        <a
          href={company.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 text-whatsapp transition-colors hover:brightness-90"
        >
          <WhatsappIconIcon height="1em" />
          <span className="text-[0.65rem] font-semibold">WhatsApp</span>
        </a>
        <button
          type="button"
          onClick={() => requestQuote()}
          className="flex flex-col items-center justify-center gap-1 text-navy transition-colors hover:text-gold"
        >
          <Send className="size-5" />
          <span className="text-[0.65rem] font-semibold">Get Quote</span>
        </button>
      </nav>
    </>
  );
}
