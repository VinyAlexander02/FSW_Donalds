import Image from "next/image";
import { CartContext, CartProduct } from "../Context/cart";
import { formatCurrency } from "@/helpers/format-currency";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContext } from "react";

interface CartItemProps {
  product: CartProduct;
}

const CartProductItem = ({ product }: CartItemProps) => {
  const { decreaseProductQuantity, increaseProductQuantity, removeProduct } =
    useContext(CartContext);
  return (
    <div className="flex items-center justify-between">
      {/*Esquerda */}
      <div className="flex items-center gap-3">
        <div className="relative h-20 w-20 bg-gray-100 rounded-xl">
          <Image src={product.imageUrl} alt={product.name} fill />
        </div>
        <div className="space-y-1">
          <p className="text-xs max-w-[90%]">{product.name}</p>
          <p className="text-sm font-semibold">
            {formatCurrency(product.price)}
          </p>
          {/*Quantidade */}
          <div className="flex items-center gap-1 text-center">
            <Button
              className="w-7 h-7 rounded-lg"
              onClick={() => decreaseProductQuantity(product.id)}
              variant="outline"
            >
              <ChevronLeftIcon size={16} />
            </Button>
            <p className="w-7 text-xs">{product.quantity}</p>
            <Button
              className="w-7 h-7 rounded-lg"
              onClick={() => increaseProductQuantity(product.id)}
              variant="destructive"
            >
              <ChevronRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/*Botão de deletar */}
      <Button
        className="w-7 h-7 rounded-lg"
        onClick={() => removeProduct(product.id)}
        variant="outline"
      >
        <TrashIcon />
      </Button>
    </div>
  );
};

export default CartProductItem;
