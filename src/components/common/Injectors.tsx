import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export type InjectorProps = {
  children?: React.ReactNode;
};

const queryClient = new QueryClient();

function Injectors({ children }: InjectorProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
}

export default Injectors;
