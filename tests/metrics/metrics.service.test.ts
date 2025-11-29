import { describe, it, expect, vi, beforeEach } from "vitest";
import { metricsService } from "../../src/modules/metrics/metrics.service";
import { prisma } from "../../src/prisma";

vi.mock("../../src/prisma", () => ({
  prisma: {
    $queryRaw: vi.fn()
  }
}));

describe("metricsService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("escolasRuraisComLabInternet", async () => {
    (prisma.$queryRaw as any).mockResolvedValue([
      { escolas_rurais_com_lab_e_internet: BigInt(10) }
    ]);

    const result = await metricsService.escolasRuraisComLabInternet();

    expect(prisma.$queryRaw).toHaveBeenCalled();
    expect(result).toEqual({ escolas_rurais_com_lab_e_internet: 10 });
  });

  it("mediaComputadoresPorAluno", async () => {
    (prisma.$queryRaw as any).mockResolvedValue([
      { media_computadores_por_aluno: 2.45 }
    ]);

    const result = await metricsService.mediaComputadoresPorAluno();

    expect(result).toEqual({ media_computadores_por_aluno: 2.45 });
  });

  it("totalEscolasNordeste", async () => {
    (prisma.$queryRaw as any).mockResolvedValue([
      { total_escolas_nordeste: BigInt(123) }
    ]);

    const result = await metricsService.totalEscolasNordeste();

    expect(result).toEqual({ total_escolas_nordeste: 123 });
  });

  it("totalEscolasNordestRural", async () => {
    (prisma.$queryRaw as any).mockResolvedValue([
      { total_escolas_nordeste: BigInt(50) }
    ]);

    const result = await metricsService.totalEscolasNordestRural();

    expect(result).toEqual({ total_escolas_nordeste: 50 });
  });

  it("detalhesInfraRural", async () => {
    (prisma.$queryRaw as any)
      .mockResolvedValueOnce([{ total_sem_banda_larga: BigInt(5) }])
      .mockResolvedValueOnce([{ total_rede_local: BigInt(12) }])
      .mockResolvedValueOnce([{ total_rede_local_sem_banda_larga: BigInt(3) }]);

    const result = await metricsService.detalhesInfraRural();

    expect(result).toEqual({
      total_sem_banda_larga: 5,
      total_rede_local: 12,
      total_rede_local_sem_banda_larga: 3
    });
  });

  it("detalhesInternetBandaLarga", async () => {
    (prisma.$queryRaw as any)
      .mockResolvedValueOnce([{ total: BigInt(4) }])
      .mockResolvedValueOnce([{ total: BigInt(20) }])
      .mockResolvedValueOnce([{ total: BigInt(7) }]);

    const result = await metricsService.detalhesInternetBandaLarga();

    expect(result).toEqual({
      rurais_com_rede_local_sem_banda_larga: 4,
      rurais_com_rede_local: 20,
      rurais_sem_banda_larga: 7
    });
  });

  it("listaEscolas", async () => {
    (prisma.$queryRaw as any).mockResolvedValue([
      { nome_escola: "Escola X", possui_laboratorio: true, possui_internet: false },
      { nome_escola: "Escola Y", possui_laboratorio: false, possui_internet: true }
    ]);

    const result = await metricsService.listaEscolas();

    expect(result).toEqual([
      {
        nome_escola: "Escola X",
        possui_laboratorio: true,
        possui_internet: false
      },
      {
        nome_escola: "Escola Y",
        possui_laboratorio: false,
        possui_internet: true
      }
    ]);

    expect(prisma.$queryRaw).toHaveBeenCalled();
  });
});
