import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useContext, useState } from "react";
import { CartContext } from "../Context/cart";
import CartProductItem from "./cart-product-item";

import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/helpers/format-currency";
import FinishedOrderButtonDialog from "./finished-order-button";
import { Button } from "@/components/ui/button";

const CartSheet = () => {
  const { isOpen, toggleCart, products, total } = useContext(CartContext);
  const [FinishedOrderButtonDialogIsOpen, setFinishedOrderButtonDialogIsOpen] =
    useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[80%]">
        <SheetHeader>
          <SheetTitle className="text-left">Sacola</SheetTitle>
        </SheetHeader>
        <div className="py-5 flex flex-col h-full">
          <div className="flex-auto">
            {products.map((product) => (
              <CartProductItem key={product.id} product={product} />
            ))}
          </div>
          <Card className="mb-6">
            <CardContent className="p-5">
              <div className="flex justify-between">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-sm fnont-semibold">
                  {formatCurrency(total)}
                </p>
              </div>
            </CardContent>
          </Card>
          <Button
            className="w-full rounded-full"
            onClick={() => setFinishedOrderButtonDialogIsOpen(true)}
          >
            Finalzar Pedido
          </Button>
          <FinishedOrderButtonDialog
            open={FinishedOrderButtonDialogIsOpen}
            openChange={setFinishedOrderButtonDialogIsOpen}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
