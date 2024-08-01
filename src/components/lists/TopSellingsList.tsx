import { getTopSelling, Product } from "@/api/dashboad";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useMemo, useState } from "react";

export default function TopSellingList() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const recentSalesData = await getTopSelling();
        setProducts(recentSalesData);
      } catch (error) {
        console.error('Erro ao buscar getTopSelling:', error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products
      .filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [searchTerm, products]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-8">
      <h3 className="text-2xl font-bold mb-6">Produtos mais vendidos</h3>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Desconto</TableHead>
              <TableHead>Vendido</TableHead>
              <TableHead>Estoque</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.title}</TableCell>
                <TableCell>${parseFloat(product.price).toFixed(2)}</TableCell>
                <TableCell>{product.discount}%</TableCell>
                <TableCell>{product.stock_total}</TableCell>
                <TableCell>{product.sold_quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}