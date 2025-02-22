"use client";

import { formatCurrency } from "@/helpers/format-currency";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChefHat, ChevronLeft, ChevronRight } from "lucide-react";
import { useContext, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CartContext } from "../../Context/cart";
import CartSheet from "../../components/cart-sheet";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
          avatarImageUrl: true;
        };
      };
    };
  }>;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const { toggleCart, addProduct } = useContext(CartContext);
  const [quantity, setQuantity] = useState<number>(1);

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => (prev === 1 ? 1 : prev - 1));
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    addProduct({
      ...product,
      quantity,
    });
    toggleCart();
  };

  return (
    <>
      <div className="relative z-50 rounded-t-3xl p-5 mt-[-1.5rem] flex flex-col">
        {/* Informações do Restaurante */}
        <div className="flex items-center gap-1.5">
          <Image
            src={product.restaurant.avatarImageUrl}
            alt={product.restaurant.name}
            width={16}
            height={16}
            className="rounded-full"
          />
          <p className="text-xs text-muted-foreground">
            {product.restaurant.name}
          </p>
        </div>

        {/* Nome do Produto */}
        <h2 className="mt-1 text-xl font-semibold">{product.name}</h2>

        {/* Preço e Quantidade */}
        <div className="flex items-center justify-between mt-3">
          <h3 className="text-xl font-semibold">
            {formatCurrency(product.price)}
          </h3>
          <div className="flex items-center gap-3 text-center">
            <Button
              variant="outline"
              className="h-8 w-8 rounded-xl"
              onClick={handleDecreaseQuantity}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <p className="w-4">{quantity}</p>
            <Button
              variant="destructive"
              className="h-8 w-8 rounded-xl"
              onClick={handleIncreaseQuantity}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Área Rolável */}
        <ScrollArea className="mt-6 max-h-48 overflow-y-auto">
          {/* Descrição do Produto */}
          <div className="space-y-3">
            <h4 className="font-semibold">Sobre</h4>
            <p className="text-sm text-muted-foreground">
              {product.description}
            </p>
          </div>

          {/* Ingredientes */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-1">
              <ChefHat className="w-5 h-5" />
              <h4 className="font-semibold">Ingredientes</h4>
            </div>
            <ul className="list-disc px-5 text-sm text-muted-fo">
              {product.ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </div>
        </ScrollArea>

        {/* Botão de Adicionar à Sacola */}
        <Button onClick={handleAddToCart} className="mt-6 w-full rounded-full">
          Adicionar à sacola
        </Button>
      </div>
      <CartSheet />
    </>
  );
};

export default ProductDetails;
