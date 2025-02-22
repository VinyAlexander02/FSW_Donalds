import { db } from "@/lib/prisma";

import { notFound } from "next/navigation";
import ProductHeader from "./components/product-header";

interface ProducPageProps {
  params: Promise<{ slug: string; productId: string }>;
}

const ProducPage = async ({ params }: ProducPageProps) => {
  const { slug, productId } = await params;
  const product = await db.product.findUnique({ where: { id: productId } });

  if (!product) {
    return notFound();
  }

  return (
    <>
      <ProductHeader product={product} />
      <h1>Product Page</h1>
      {slug},{productId}
    </>
  );
};

export default ProducPage;
