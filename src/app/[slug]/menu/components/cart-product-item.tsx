import Image from "next/image";
import { CartProduct } from "../Context/cart";
import { formatCurrency } from "@/helpers/format-currency";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartItemProps {
  product: CartProduct;
}

const CartProductItem = ({ product }: CartItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/*Esquerda */}
        <div className="relative h-20 bg-gray-200 rounded-xl">
          <Image src={product.imageUrl} alt={product.name} fill />
          <div className="space-y-1">
            <p className="text-xs max-w-[90%] truncate text-ellipsis">
              {product.name}
            </p>
            <p className="text-sm font-semibold">
              {formatCurrency(product.price)}
            </p>
            {/*Quantidade */}
            <div className="flex items-center gap-1 text-center">
              <Button className="w-7 h-7 rounded-lg">
                <ChevronLeftIcon size={16} />
              </Button>
              <p className="w-7 text-xs">{product.quantity}</p>
              <Button className="w-7 h-7 rounded-lg" variant="destructive">
                <ChevronRightIcon size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/*Botão de deletar */}
      <Button className="w-7 h-7 rounded-lg" variant="outline">
        <TrashIcon />
      </Button>
    </div>
  );
};

export default CartProductItem;
