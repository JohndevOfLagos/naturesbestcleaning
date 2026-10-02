# Pixel Perfect

Implement exactly the screenshot and nothing else

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4a5387ee-7a6a-4419-b8cb-7c257e3b96ec).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run build
npm run preview -- --port 3001
```

The preview command serves the Cloudflare worker build and its static assets locally. Set `PORT` or pass `--port` to choose a different port.

## Quote Delivery

Configure these server-side environment variables before accepting live enquiries:

- `COMPANY_EMAIL`: inbox that receives quote requests.
- `RESEND_API_KEY`: Resend API key.
- `RESEND_FROM_EMAIL`: verified Resend sender, for example `Nature's Best Cleaning <quotes@your-verified-domain>`.
- `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`: server-only credentials used to save quote requests. Apply the quote requests migration before launch.

Never expose the Resend API key or Supabase service-role key through a `VITE_` variable.
