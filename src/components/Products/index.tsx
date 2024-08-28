import { deleteProduct, getProducts, searchProducts } from "@/api/products";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Link, useNavigate } from "react-router-dom";
import { Product } from "@/api/interfaces";
import { ChevronLeftIcon, SearchIcon, CirclePlusIcon, FilePenIcon, TrashIcon } from "@/components/ui/toy-icon";

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const pageSize = 10;
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = useCallback(() => {
    const searchProductsWithDebounce = async (search: string) => {
      try {
        if (search) {
          const searchResults = await searchProducts(search, 1, pageSize);
          setProducts(searchResults.products);
          setTotalPages(searchResults.totalPages);
        } else {
          const response = await getProducts(1, pageSize);
          setProducts(response.products);
          setTotalPages(response.totalPages);
          setCurrentPage(1);
        }
      } catch (error) {
        console.error("Erro ao pesquisar produtos:", error);
      }
    };

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      searchProductsWithDebounce(searchTerm);
    }, 1500); // timer de 1.5 segundos para a pesquisa
  }, [searchTerm, pageSize]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts(currentPage, pageSize);
        setProducts(response.products);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProducts();
  }, [currentPage, pageSize]);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, handleSearch]);

  const getPaginationPages = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, -1, totalPages);
      } else if (currentPage > totalPages - 3) {
        pages.push(1, -1, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, -1, currentPage - 1, currentPage, currentPage + 1, -1, totalPages);
      }
    }
    return pages;
  };

  const paginationPages = getPaginationPages();

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col gap-4 my-4">
        <div className="py-1 px-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Produtos</BreadcrumbPage>
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
          <div className="relative ml-auto flex-1 md:grow-0">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Pesquisar..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Atualize o estado do termo de pesquisa
            />
          </div>
          <Button onClick={() => navigate("/products/create")} size="sm" className="h-8 gap-1">
            <CirclePlusIcon className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Adicionar produtos
            </span>
          </Button>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Produtos</CardTitle>
              <CardDescription>
                Lista de produtos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Marca</TableHead>
                    <TableHead>Categorias</TableHead>
                    <TableHead>Estoque</TableHead>
                    <TableHead>Desconto</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>
                      <span className="sr-only">Ações</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell className="hidden sm:table-cell">
                        <img
                          alt="Product image"
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={
                            product.product_image.length > 0
                              ? product.product_image[0].url
                              : "/placeholder.svg"
                          }
                          width="64"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{product.title}</TableCell>
                      <TableCell>
                        {product.brand}
                      </TableCell>
                      <TableCell>
                        {product.product_categories.map((category) => (
                          <span key={category.id}>{category.name}</span>
                        ))}
                      </TableCell>
                      <TableCell>{product.stock_total} em estoque</TableCell>
                      <TableCell>{product.discount}%</TableCell>
                      <TableCell>
                        R${parseFloat(product.price).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button onClick={() => navigate(`/product/edit/${product.id}`)} variant="ghost" size="icon">
                            <FilePenIcon className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>

                          <AlertDialog>
                            <AlertDialogTrigger>
                              <TrashIcon className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Deseja realmente excluir o item {product.title}?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Essa ação é irreverssível.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction asChild>
                                  <Button type="button" onClick={async () => {
                                    
                                    await deleteProduct(product.id)
                                    const response = await getProducts(currentPage, pageSize);
                                    setProducts(response.products);
                                    setTotalPages(response.totalPages);

                                  }} variant="destructive">
                                    Excluir
                                  </Button>
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">
                Mostrando{" "}
                <strong>
                  {(currentPage - 1) * pageSize + 1}-
                  {Math.min(currentPage * pageSize, products.length)}
                </strong>{" "}
                de <strong>{products.length}</strong> produtos
              </div>
              <Pagination>
                <PaginationContent>
                  {totalPages > 1 && (
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                      />
                    </PaginationItem>
                  )}
                  {paginationPages.map((page, index) =>
                    page === -1 ? (
                      <PaginationItem key={`ellipsis-${index}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    ) : (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          isActive={currentPage === page}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}
                  {totalPages > 1 && (
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                        disabled={currentPage === totalPages}
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  );
}
