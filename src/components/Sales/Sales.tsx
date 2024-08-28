import {
  ChevronLeftIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "../ui/breadcrumb";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TruckFast } from "../ui/toy-icon";
import { Sale } from "@/api/interfaces";
import { getSales } from "@/api/sales";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { AlertDialogHeader, AlertDialogFooter } from "../ui/alert-dialog";

export default function Sales() {
  const navigate = useNavigate();
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await getSales();
        setSales(response);
      } catch (error) {
        console.error("Erro ao buscar vendas:", error);
      }
    };
    fetchSales();
  }, []);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col gap-4 my-4">
        <div className="py-1 px-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Painel</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Vendas</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Link to={"/"}>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ChevronLeftIcon className="h-4 w-4" />
              <span className="sr-only">Voltar</span>
            </Button>
          </Link>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Vendas</CardTitle>
              <CardDescription>Lista de vendas.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Valor Total</TableHead>
                    <TableHead>Nome do Usuário</TableHead>
                    <TableHead>Endereço</TableHead>
                    <TableHead>Itens</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sales.map((sale, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        R$ {sale.total_value}
                      </TableCell>
                      <TableCell>{sale.users.name}</TableCell>
                      <TableCell>
                        <AlertDialog>
                          <AlertDialogTrigger>
                            <span className="bg-green-500 rounded-md text-white px-4 py-1">
                              Visualizar
                            </span>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Endereço</AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogDescription>
                              <div className="flex flex-col p-3 space-y-5">
                                <div className="flex space-x-8">
                                  <div className="flex flex-col">
                                    <span className="font-medium">Rua</span>
                                    <span>{sale.addresses.street}</span>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="font-medium">Número</span>
                                    <span>{sale.addresses.number}</span>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="font-medium">Complemento</span>
                                    <span>{sale.addresses.additional_info}</span>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="font-medium">Bairro</span>
                                    <span>{sale.addresses.neighborhood}</span>
                                  </div>
                                </div>
                                <div className="flex self-start space-x-8">
                                  <div className="flex flex-col">
                                    <span className="font-medium">Cidade</span>
                                    <span>{sale.addresses.city}</span>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="font-medium">Estado</span>
                                    <span>{sale.addresses.state}</span>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="font-medium">CEP</span>
                                    <span>{sale.addresses.zip_code}</span>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="font-medium">País</span>
                                    <span>{sale.addresses.country}</span>
                                  </div>
                                </div>
                              </div>
                            </AlertDialogDescription>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Fechar</AlertDialogCancel>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                      <TableCell>{sale.quantity}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={() =>
                              navigate(`/sales/edit/${sale.id}`)
                            }
                            variant="ghost"
                            size="icon"
                          >
                            <TruckFast className="h-4 w-4" />
                            <span className="sr-only">Enviar Produto</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
