import { getRecentSales, Sale } from "@/api/dashboad";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useMemo, useState } from "react";

export default function RecentTransactionsList() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const recentSalesData = await getRecentSales();
        console.log(recentSalesData)
        setSales(recentSalesData);
      } catch (error) {
        console.error('Erro ao buscar getRecentSales:', error);
      }
    };

    fetchSales();
  }, []);

  const filteredSales = useMemo(() => {
    return sales.filter(sale => {
      // Filtragem por data ou valor total
      return (
        sale.sale_date.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.total_value.includes(searchTerm)
      );
    });
  }, [searchTerm, sales]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-8">
      <h3 className="text-2xl font-bold mb-6">Transações recentes</h3>
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
              <TableHead>ID</TableHead>
              <TableHead>Data da Venda</TableHead>
              <TableHead>Forma de Pagamento</TableHead>
              <TableHead>Valor Total</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell className="font-medium">{sale.id}</TableCell>
                <TableCell>{new Date(sale.sale_date).toLocaleDateString()}</TableCell>
                <TableCell>{sale.payment_method_id}</TableCell>
                <TableCell>R${parseFloat(sale.total_value).toFixed(2)}</TableCell>
                <TableCell>{sale.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
