<div align="center">
  <h1>🛡️ EdgeGuard</h1>
  <p><strong>A privacy-first, edge-native web framework.</strong></p>
  <p>
    <a href="https://www.npmjs.com/package/edgeguard"><img src="https://img.shields.io/npm/v/edgeguard.svg?style=flat-square" alt="NPM Version"></a>
    <a href="https://github.com/Imran-Ashiq/edgeguard/actions/workflows/ci.yml"><img src="https://github.com/Imran-Ashiq/edgeguard/actions/workflows/ci.yml/badge.svg" alt="Build Status"></a>
    <a href="https://github.com/Imran-Ashiq/edgeguard/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/edgeguard.svg?style=flat-square" alt="License"></a>
  </p>
</div>

---

EdgeGuard is a simple, lightweight, and developer-friendly web framework for TypeScript, designed for modern edge computing environments like Cloudflare Workers, Vercel, and Deno. It takes inspiration from Express but is built from the ground up with a **"secure by default"** and **"privacy-first"** philosophy.

Our goal is to give developers the power to build fast, secure, and respectful APIs with zero configuration.

## ✨ Core Features

*   **🛡️ Secure by Default:** Automatically adds a strong set of security headers (`CSP`, `HSTS`, `X-Frame-Options`, etc.) to every response to protect against common web vulnerabilities.
*   **🤫 Privacy-First:** Includes a built-in JSON logger that automatically redacts sensitive user information. Log what you need, never what you don't.
*   **⚡ Edge-Native & Fast:** Built on modern Web Standard APIs (`Request`, `Response`) for maximum portability and performance. It's tiny, with a minimal footprint and near-instant cold starts.
*   **💪 TypeScript First:** Designed from the ground up to provide an excellent developer experience with strong type safety, autocompletion, and a clean, modern API.

---

## 🚀 Quick Start

Get a secure and private API running in less than a minute.


## 🚀 Quick Start

**1. Installation:**

```bash
# We recommend pnpm for its speed and efficiency
npm install edgeguard
```

**2. Create your application:**

```typescript
// index.ts
import { createApp } from 'edgeguard';

// Initialize the app
const app = createApp();

// Define a simple GET route
app.get('/', (req) => {
  // Use the built-in logger for privacy-safe logging of the request
  // This will produce a JSON string like: {"method":"GET","url":"http://localhost/"}
  console.log(app.log(req));
  return new Response('Hello from a Secure & Private API!');
});

// Define a POST route
app.post('/users', (req) => {
  return new Response('User created!', { status: 201 });
});

// Export the handler for your edge environment
export default {
  // The 'fetch' method is the standard entry point for many edge runtimes
  fetch: app.handle,
};
```

---

## 🗺️ Project Roadmap: The Future of EdgeGuard

This MVP is just the beginning. Our vision is to make EdgeGuard the go-to framework for developers who care about security, privacy, and performance. Here are the next features we plan to build:

- 💡 **Advanced Middleware Support:** A clean, composable `.use()` method to allow developers to easily add custom logic for things like authentication, complex logging, and request pre-processing.
- 🌐 **Robust CORS Handling:** A simple, powerful API (`app.cors()`) to manage Cross-Origin Resource Sharing policies, another critical security feature.
- 📦 **Request Body Parsing:** Built-in helpers to safely parse JSON, form data, and other common request body types.
- 🔗 **Parameterized Routes:** Support for dynamic routes (e.g., `/users/:id`) to easily capture values from the URL path.
- 🔌 **Extensible Logging:** Allow developers to "plug in" their own logging destinations (like Datadog or Sentry) while still benefiting from our privacy-first formatting.
- 🔐 **Compliance & Encryption Helpers:** Tools to assist developers in meeting compliance standards like GDPR and CCPA, and helpers for common encryption tasks.

---

## 🤝 Contributing

EdgeGuard is an open-source project built for the community, by the community. We welcome contributions of all kinds! Whether it's reporting a bug, proposing a new feature, improving documentation, or writing code, your help is valued.

Please feel free to [open an issue](https://github.com/Imran-Ashiq/edgeguard/issues) or submit a pull request.

---

## 💬 Getting Help

If you have questions, need help, or want to discuss ideas, please use [GitHub Discussions](https://github.com/Imran-Ashiq/edgeguard/discussions) or open an issue.

---

<div align="center">
<p>Built with ❤️ by Muhammad Imran</p>
</div>
