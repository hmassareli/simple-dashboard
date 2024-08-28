import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "../ui/breadcrumb";
import { Button } from "../ui/button";
import { ChevronLeft, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Sale, SaleItem } from "@/api/interfaces";
import { getSaleById, updateSaleWithDelivery } from "@/api/sales";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";

const saleSchema = z.object({
  code: z.string().min(1, { message: "Código é obrigatório" }),
});

export function EditSales() {
  const [sale, setSale] = useState<Sale>();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { id: sale_id } = useParams();

  if (!sale_id) {
    navigate("/sales");
    return;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(saleSchema),
  });

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await getSaleById(sale_id);
        setSale(response);
      } catch (error) {
        console.error("Erro ao buscar vendas:", error);
      }
    };
    fetchSales();
  }, [sale_id]);

  const onSubmit = async (data: any) => {
    try {
      console.log(data);
      setIsLoading(true);
      const response = await updateSaleWithDelivery(data.code, sale_id);
      if (response) {
        navigate("/sales");
      }
    } catch (error) {
      console.log("deliverySale Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen w-full bg-muted/40">
      <div className="container flex flex-col">
        <div className="flex flex-col sm:gap-4 m-auto sm:py-4 sm:pl-14">
          <div className="flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Painel</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/sales">Vendas</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Editar venda</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <main className="flex w-full gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex mb-4">
                  <Link to={"/sales"}>
                    <Button variant="outline" size="icon" className="h-10 w-10">
                      <ChevronLeft className="h-4 w-4" />
                      <span className="sr-only">Voltar</span>
                    </Button>
                  </Link>

                  <div className="hidden items-center gap-2 md:ml-auto md:flex">
                    <Link to={"/sales"}>
                      <Button disabled={isLoading} variant="outline" size="sm">
                        Descartar
                      </Button>
                    </Link>
                    <Button disabled={isLoading} type="submit" size="sm">
                      {isLoading && (
                        <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
                      )}
                      Enviar pedido
                    </Button>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                  <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                    <Card x-chunk="dashboard-07-chunk-0">
                      <CardHeader>
                        <CardTitle>Detalhes da venda</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Label htmlFor="code">Código do pedido</Label>
                        <Input
                          disabled={isLoading}
                          id="code"
                          type="text"
                          className="w-full"
                          {...register("code")}
                        />
                        {errors.name && (
                          <span className="text-red-500">
                            {errors.name.message?.toString()}
                          </span>
                        )}
                        <div className="flex flex-row p-3 mt-10">
                          <div className="pr-10">
                            <div className="font-medium">ID</div>
                            <span>{sale?.id}</span>
                          </div>
                          <div className="pr-10">
                            <div className="font-medium">Nome do usuário</div>
                            <span>{sale?.users.name}</span>
                          </div>
                          <div className="px-10">
                            <div className="font-medium">Preço total</div>
                            <span>R$ {sale?.total_value}</span>
                          </div>
                          <div>
                            <div className="font-medium">Valor do frete</div>
                            <span>R$ {sale?.deliveryValue}</span>
                          </div>
                        </div>
                        <Table className="mt-10">
                          <TableHeader>
                            <TableRow>
                              <TableHead>Nome</TableHead>
                              <TableHead>Preço</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {sale?.sale_items.map((sale, index) => (
                              <TableRow key={index}>
                                <TableCell className="font-medium">
                                  {sale.products.title}
                                </TableCell>
                                <TableCell>R$ {sale.products.price}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
