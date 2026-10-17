import { ConvexClientProvider } from "@/components/ConvexClientProvider"; // yoki pastdagi kabi to'g'ridan-to'g'ri

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <body>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}