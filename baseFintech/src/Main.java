// Importa classes necessárias do Java
// ArrayList e List: para trabalhar com listas dinâmicas
// Scanner: para capturar dados digitados pelo usuário
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        // Cria saldo inicial
        System.out.print("Digite o saldo inicial: ");
        double saldoInicial = sc.nextDouble();
        sc.nextLine();
        Saldo saldo = new Saldo(saldoInicial);

        Meta metaAtual = null;
        Investimento investimentoAtual = null;
        List<Transacao> historico = new ArrayList<>();

        int opPrincipal;
        do {
            // ---------------- MENU PRINCIPAL ----------------
            System.out.println("\n=== MENU PRINCIPAL ===");
            System.out.println("1 - Gerenciar Saldo");
            System.out.println("2 - Gerenciar Metas");
            System.out.println("3 - Gerenciar Investimentos");
            System.out.println("0 - Sair do programa");
            System.out.print("Escolha uma opção: ");
            opPrincipal = sc.nextInt();
            sc.nextLine();

            switch (opPrincipal) {
                case 1 -> menuSaldo(sc, saldo);
                case 2 -> metaAtual = menuMetas(sc, metaAtual);
                case 3 ->
                        investimentoAtual = menuInvestimentos(sc, investimentoAtual);
                case 0 -> System.out.println("Finalizando programa...");
                default -> System.out.println("Opção inválida!");
            }
        } while (opPrincipal != 0);

        sc.close();
    }

    // ---------------- MENU SALDO ----------------
    public static void menuSaldo(Scanner sc, Saldo saldo) {
        int opcao;
        do {
            System.out.println("\n--- Menu Saldo ---");
            System.out.println("1 - Exibir saldo");
            System.out.println("2 - Depositar");
            System.out.println("3 - Sacar");
            System.out.println("0 - Voltar");
            System.out.print("Escolha uma opção: ");
            opcao = sc.nextInt();
            sc.nextLine();

            switch (opcao) {
                case 1 -> saldo.exibirSaldo();
                case 2 -> {
                    System.out.print("Digite o valor do depósito: ");
                    double deposito = sc.nextDouble();

                    AlertaReceita alerta = new AlertaReceita(deposito);
                    alerta.exibirAlertas();

                    saldo.adicionarSaldo(deposito);

                }
                case 3 -> {
                    System.out.print("Digite o valor do saque: ");
                    double saque = sc.nextDouble();
                    saldo.sacarSaldo(saque);

                    AlertaSaldo alerta = new AlertaSaldo(saldo.getSaldo(), 100.0);
                    if (alerta.precisaAlertar()) {
                        alerta.exibirAlertas();
                    }

                }
                case 0 -> System.out.println("Voltando ao menu principal...");
                default -> System.out.println("Opção inválida!");
            }
        } while (opcao != 0);
    }

    // ---------------- MENU METAS ----------------
    public static Meta menuMetas(Scanner sc, Meta metaAtual) {
        int opMeta;
        do {
            System.out.println("\n--- Menu Metas ---");
            System.out.println("1 - Criar meta");
            System.out.println("2 - Atualizar meta");
            System.out.println("3 - Excluir meta");
            System.out.println("0 - Voltar");
            System.out.print("Escolha uma opção: ");
            opMeta = sc.nextInt();
            sc.nextLine();

            switch (opMeta) {
                case 1 -> {
                    System.out.print("Descrição da meta: ");
                    String descricaoMeta = sc.nextLine();
                    System.out.print("Valor objetivo: ");
                    double valorObjetivo = sc.nextDouble();
                    System.out.print("Valor atual: ");
                    double valorAtual = sc.nextDouble();

                    metaAtual = new Meta(descricaoMeta, valorObjetivo, valorAtual);
                    System.out.println("Meta criada com sucesso!");
                    exibirProgressoMeta(metaAtual);
                }
                case 2 -> {
                    if (metaAtual == null) {
                        System.out.println("Nenhuma meta criada!");
                    } else {
                        System.out.println("1 - Adicionar valor");
                        System.out.println("2 - Retirar valor");
                        System.out.print("Escolha uma opção: ");
                        int escolha = sc.nextInt();
                        System.out.print("Digite o valor: ");
                        double valor = sc.nextDouble();

                        if (escolha == 1) metaAtual.adicionarValor(valor);
                        else if (escolha == 2) metaAtual.adicionarValor(-valor);

                        exibirProgressoMeta(metaAtual);
                    }
                }
                case 3 -> {
                    if (metaAtual != null) {
                        metaAtual = null;
                        System.out.println("Meta excluída!");
                    } else {
                        System.out.println("Nenhuma meta para excluir!");
                    }
                }
                case 0 -> System.out.println("Voltando ao menu principal...");
                default -> System.out.println("Opção inválida!");
            }
        } while (opMeta != 0);

        return metaAtual;
    }

    // Método auxiliar para exibir progresso e status
    public static void exibirProgressoMeta(Meta meta) {
        if (meta.estaConcluida()) {
            System.out.println("Meta concluída!");
        } else {
            System.out.printf("Progresso: %.2f%%\n", meta.calcularProgresso());
        }
    }

    // ---------------- MENU INVESTIMENTOS ----------------
    public static Investimento menuInvestimentos(Scanner sc, Investimento investimentoAtual) {
        int opInv;
        do {
            System.out.println("\n--- Menu Investimentos ---");
            System.out.println("1 - Criar investimento");
            System.out.println("2 - Atualizar investimento");
            System.out.println("3 - Excluir investimento");
            System.out.println("0 - Voltar");
            System.out.print("Escolha uma opção: ");
            opInv = sc.nextInt();
            sc.nextLine();

            switch (opInv) {
                case 1 -> {
                    System.out.print("Tipo: ");
                    String tipo = sc.nextLine();
                    System.out.print("Descrição: ");
                    String desc = sc.nextLine();
                    System.out.print("Valor: ");
                    double valor = sc.nextDouble();
                    investimentoAtual = new Investimento(tipo, desc, valor);
                    System.out.println("Investimento criado!");
                }
                case 2 -> {
                    if (investimentoAtual == null) {
                        System.out.println("Nenhum investimento criado!");
                    } else {
                        System.out.println("1 - Alterar descrição");
                        System.out.println("2 - Alterar valor");
                        int escolha = sc.nextInt();
                        sc.nextLine();
                        if (escolha == 1) {
                            System.out.print("Nova descrição: ");
                            investimentoAtual.setDescricao(sc.nextLine());
                        } else if (escolha == 2) {
                            System.out.print("Novo valor: ");
                            investimentoAtual.setValor(sc.nextDouble());
                        }
                        System.out.println("Investimento atualizado!");
                    }
                }
                case 3 -> {
                    if (investimentoAtual != null) {
                        investimentoAtual = null;
                        System.out.println("Investimento excluído!");
                    } else {
                        System.out.println("Nenhum investimento para excluir!");
                    }
                }
                case 0 -> System.out.println("Voltando ao menu principal...");
                default -> System.out.println("Opção inválida!");
            }
        } while (opInv != 0);

        return investimentoAtual;
    }

}