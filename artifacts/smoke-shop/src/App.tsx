import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/lib/i18n";
import { CartProvider } from "@/lib/cart";
import Layout from "@/components/layout/Layout";
import HomePage from "@/pages/home";
import ProductsPage from "@/pages/products";
import ProductDetailPage from "@/pages/product-detail";
import CategoryPage from "@/pages/category";
import CartPage from "@/pages/cart";
import AboutPage from "@/pages/about";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/products" component={ProductsPage} />
        <Route path="/products/:id" component={ProductDetailPage} />
        <Route path="/categories/:id" component={CategoryPage} />
        <Route path="/cart" component={CartPage} />
        <Route path="/about" component={AboutPage} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <CartProvider>
          <TooltipProvider>
           <WouterRouter> 
              <Router />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </CartProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
