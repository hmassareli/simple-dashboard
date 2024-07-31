import { getRecentSales, Sale } from "@/api/dashboad";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useMemo, useState } from "react";

export default function RecentTransactionsList() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sales, setSales] = useState<Sale[]>([]);

  const getBadge = (status: string) => {
    switch (status) {
      case 'awaiting_payment':
        return (
          <p className="bg-green-100 text-yellow-800 border border-yellow-200 rounded-full px-3 py-1 inline-block">
            Aguardando pagamento
          </p>
        );
      case 'confirmed':
        return (
          <p className="bg-green-100 text-green-800 border border-green-200 rounded-full px-3 py-1 inline-block">
            Confirmado
          </p>
        );
      case 'shipped':
        return (
          <p className="bg-yellow-100 text-yellow-800 border border-yellow-200 rounded-full px-3 py-1 inline-block">
            Enviado
          </p>
        );
      case 'delivered':
        return (
          <p className="bg-red-100 text-green-800 border border-green-200 rounded-full px-3 py-1 inline-block">
            Entregue
          </p>
        );
      case 'cancelled':
        return (
          <p className="bg-blue-100 text-red-800 border border-red-200 rounded-full px-3 py-1 inline-block">
            Cancelado
          </p>
        );
      case 'completed':
        return (
          <p className="bg-blue-100 text-blue-800 border border-blue-200 rounded-full px-3 py-1 inline-block">
            Completo
          </p>
        );
      default:
        return (
          <p className="bg-gray-100 text-gray-800 border border-gray-200 rounded-full px-3 py-1 inline-block">
            Desconhecido
          </p>
        );
    }
  };
  

  const handlePaymentMethod = (pm: number) => {
    switch (pm) {
      case 1:
        return 'PIX';
      case 2:
        return 'Cartão de Crédito';
      default:
        return "Outro";
    }
  };

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
                <TableCell>{handlePaymentMethod(sale.payment_method_id)}</TableCell>
                <TableCell>R${parseFloat(sale.total_value).toFixed(2)}</TableCell>
                <TableCell>{getBadge(sale.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
