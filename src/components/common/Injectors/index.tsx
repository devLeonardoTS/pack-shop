import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HydrationZustand } from "../HydrationZustand";

export type InjectorProps = {
  children?: React.ReactNode;
};

const queryClient = new QueryClient();

function Injectors({ children }: InjectorProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <HydrationZustand>{children}</HydrationZustand>
      </QueryClientProvider>
    </>
  );
}

export default Injectors;
