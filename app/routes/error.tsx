import type { ReactNode } from "react";

type Props = {
    error: unknown;
};

export function ErrorBoundary({ error }: Props): ReactNode {
    console.error(error);
    return (
        <div className="p-4">
            <h1 className="text-lg font-semibold">Oups, une erreur est survenue.</h1>
            <p className="text-sm text-zinc-400">
                Rechargez la page ou revenez à l&apos;accueil.
            </p>
        </div>
    );
}
