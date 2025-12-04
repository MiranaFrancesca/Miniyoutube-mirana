// app/root.tsx
import { Outlet, Scripts, ScrollRestoration } from "react-router";
import "~/app.css";

import { Header } from "~/layouts/Header/Header";
import Footer from "~/layouts/Footer/Footer";

import { MainNav } from "~/navigation/MainNav/MainNav";
import { VideoProvider } from "~/contexts/VideoContext";

export default function Root() {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <title>Mini YouTube - TP React</title>
      </head>

      <body className="bg-white text-black">

        <VideoProvider>
          <div className="flex h-screen">

            {/* sidebar */}
            <MainNav />

            {/* colonne de droite header et contenu et footer */}
            <div className="flex flex-1 flex-col">

              <Header />

              <main className="flex-1 overflow-y-auto bg-white">
                <Outlet />
              </main>

              <Footer />
            </div>
          </div>
        </VideoProvider>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
