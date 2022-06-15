import React, { useState, createContext, useEffect } from 'react';
import api from '../services/api'
import moment from 'moment';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

    // Data Resumos
    const [filiais, setFiliais] = useState();
    const [associacoes, setAssociacoes] = useState();
    const [exportacoes, setExportacoes] = useState();
    const [totais, setTotais] = useState();

    // Data Faturamento lojas
    const [fatuLojas, setFatuLojas] = useState();
    const [fatuTotLojas, setFatuTotLojas] = useState();
    const [fatuGrafLojas, setFatuGrafLoja] = useState();
    const [fatuPerfAssocLojas, setFatuPerfAssocLojas] = useState();
    const [fatuPerfMesLojas, setFatuPerfMesLojas] = useState();
    const [fatuTotPerfLojas, setFatuTotPerfLojas] = useState();

    // Data Serviços Lojas
    const [serResumoDia, setSerResumoDia] = useState();
    const [serPerform, setSerPerform] = useState();
    const [serGrafico, setSerGrafico] = useState();
    const [serTotais, setSerTotais] = useState();

    // Data Compras Lojas
    const [comComparaDia, setComComparaDia] = useState();
    const [comPerfMes, setComPerfMes] = useState();
    const [comPerfAssoc, setComPerfAssoc] = useState();
    const [comGrafico, setComGrafico] = useState();
    const [comTotais, setComTotais] = useState();

    // Data faturamento Gráfico
    const [nfatuSetor, setNfatuSetor] = useState();
    const [nfatuGrupo, setNfatuGrupo] = useState();
    const [nfatuAssoc, setNfatuAssoc] = useState();
    const [nfatuTotais, setNfatuTotais] = useState();

    const [dataFiltro, setDataFiltro] = useState(new Date());

    const dtFormatada = (date) => {
        return moment(date).format('YYYY-MM-DD');
    }

    // Extração de dados resumos filiais
    useEffect(() => {
        async function getFiliais() {
            await api.get('filiais')
                .then(filiais => {
                    const filial = filiais.data.filter((fil) => (dtFormatada(fil.Atualizacao) === dtFormatada(dataFiltro)))
                        .sort((a, b) => parseInt(a.Faturamento) < parseInt(b.Faturamento) ? 1 : -1);
                    setFiliais(filial);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getFiliais();
    }, [dataFiltro]);

    // Extração de dados resumos associações
    useEffect(() => {
        async function getAssociacoes() {
            await api.get('associacoes')
                .then(associacoes => {
                    const associacao = associacoes.data.filter((assoc) => (dtFormatada(assoc.Atualizacao) === dtFormatada(dataFiltro)))
                        .sort((a, b) => parseInt(a.Faturamento) < parseInt(b.Faturamento) ? 1 : -1);
                    setAssociacoes(associacao);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getAssociacoes();
    }, [dataFiltro]);

    // Extração de dados resumos Exportações
    useEffect(() => {
        async function getExportacoes() {
            await api.get('exportacoes')
                .then(exportacoes => {
                    const exportacao = exportacoes.data.filter((expo) => (dtFormatada(expo.Atualizacao) === dtFormatada(dataFiltro)))
                        .sort((a, b) => parseInt(a.Faturamento) < parseInt(b.Faturamento) ? 1 : -1);
                    setExportacoes(exportacao);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getExportacoes();
    }, [dataFiltro]);

    // Extração de dados resumos totais
    useEffect(() => {
        async function getTotais() {
            await api.get('totais')
                .then(totais => {
                    const total = totais.data.filter((tot) => (dtFormatada(tot.Atualizacao) === dtFormatada(dataFiltro)));
                    setTotais(total);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getTotais();
    }, [dataFiltro]);

    // Extração de dados do faturamento
    useEffect(() => {
        async function getFatuLojas() {
            await api.get('fatulojas')
                .then(fatulojas => {
                    const fatuloja = fatulojas.data.filter((fat) => (dtFormatada(fat.Atualizacao) === dtFormatada(dataFiltro)))
                        .sort((a, b) => parseInt(a.Faturamento) < parseInt(b.Faturamento) ? 1 : -1);
                    setFatuLojas(fatuloja);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getFatuLojas();
    }, [dataFiltro]);

    // Extração de dados do faturamento total
    useEffect(() => {
        async function getFatuTotLojas() {
            await api.get('fatutotlojas')
                .then(fatutotlojas => {
                    const fatutotloja = fatutotlojas.data.filter((fatt) => (dtFormatada(fatt.Atualizacao) === dtFormatada(dataFiltro)));
                    setFatuTotLojas(fatutotloja);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getFatuTotLojas();
    }, [dataFiltro]);

    // Extração de dados do faturamento gráfico
    useEffect(() => {
        async function getFatuGrafLojas() {
            await api.get('fatugraflojas')
                .then(fatugraflojas => {
                    const fatugrafloja = fatugraflojas.data.filter((fatg) => (dtFormatada(fatg.Atualizacao) === dtFormatada(dataFiltro)));
                    setFatuGrafLoja(fatugrafloja);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getFatuGrafLojas();
    }, [dataFiltro]);

    // Extração de dados do faturamento performance associação
    useEffect(() => {
        async function getFatuPerfAssocLojas() {
            await api.get('fatuperfassoclojas')
                .then(fatuperfassoclojas => {
                    const fatuperfassocloja = fatuperfassoclojas.data.filter((fata) => (dtFormatada(fata.Atualizacao) === dtFormatada(dataFiltro)))
                        .sort((a, b) => parseInt(a.Faturamento) < parseInt(b.Faturamento) ? 1 : -1);
                    setFatuPerfAssocLojas(fatuperfassocloja);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getFatuPerfAssocLojas();
    }, [dataFiltro]);

    // Extração de dados do faturamento performance associação
    useEffect(() => {
        async function getFatuPerfMesLojas() {
            await api.get('fatuperfmeslojas')
                .then(fatuperfmeslojas => {
                    const fatuperfmesloja = fatuperfmeslojas.data.filter((fatm) => (dtFormatada(fatm.Atualizacao) === dtFormatada(dataFiltro)))
                        .sort((a, b) => parseInt(a.AnoMesNum) < parseInt(b.AnoMesNum) ? 1 : -1);
                    setFatuPerfMesLojas(fatuperfmesloja);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getFatuPerfMesLojas();
    }, [dataFiltro]);

    // Extração de dados do faturamento performance total
    useEffect(() => {
        async function getFatuTotPerfLojas() {
            await api.get('fatutotperflojas')
                .then(fatutotperflojas => {
                    const fatutotperfloja = fatutotperflojas.data.filter((fatm) => (dtFormatada(fatm.Atualizacao) === dtFormatada(dataFiltro)));
                    setFatuTotPerfLojas(fatutotperfloja);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getFatuTotPerfLojas();
    }, [dataFiltro]);

    // Serviços resumo Lojas *************************
    useEffect(() => {
        async function getSerResumoDia() {
            await api.get('serresumodia')
                .then(serresumodia => {
                    const fatutotperfloja = serresumodia.data.filter((sr) => (dtFormatada(sr.Atualizacao) === dtFormatada(dataFiltro)))
                        .sort((a, b) => a.Supervisor > b.Supervisor ? 1 : -1);
                    setSerResumoDia(fatutotperfloja);
                })
                .catch(err => {
                    console.log(err)
                });
        }
        getSerResumoDia();
    }, [dataFiltro]);

    // Serviços perform dia Lojas *************************
    useEffect(() => {
        async function getSerPerform() {
            await api.get('serperform')
                .then(sperform => {
                    const resumo = sperform.data.filter((perf) => (dtFormatada(perf.Atualizacao) === dtFormatada(dataFiltro)))
                        .sort((a, b) => parseInt(a.AnoMesNum) < parseInt(b.AnoMesNum) ? 1 : -1);
                    setSerPerform(resumo);
                })
                .catch(err => {
                    console.log(err)
                });
        }
        getSerPerform();
    }, [dataFiltro]);

    // Serviços gráfico Lojas *************************
    useEffect(() => {
        async function getSerGrafico() {
            await api.get('sergrafico')
                .then(sgrafico => {
                    const grafico = sgrafico.data.filter((graf) => (dtFormatada(graf.Atualizacao) === dtFormatada(dataFiltro)));
                    setSerGrafico(grafico);
                })
                .catch(err => {
                    console.log(err)
                });
        }
        getSerGrafico();
    }, [dataFiltro]);

    // Serviços totais Lojas *************************
    useEffect(() => {
        async function getSerTotais() {
            await api.get('sertotais')
                .then(stotais => {
                    const totais = stotais.data.filter((tot) => (dtFormatada(tot.Atualizacao) === dtFormatada(dataFiltro)));
                    setSerTotais(totais);
                })
                .catch(err => {
                    console.log(err)
                });
        }
        getSerTotais();
    }, [dataFiltro]);

    // Compras compara dia Lojas *************************
    useEffect(() => {
        async function getComComparaDia() {
            await api.get('comcomparadia')
                .then(ccompara => {
                    const compara = ccompara.data.filter((comp) => (dtFormatada(comp.Atualizacao) === dtFormatada(dataFiltro)))
                        .sort((a, b) => parseInt(a.CompraMes) < parseInt(b.CompraMes) ? 1 : -1);
                    setComComparaDia(compara);
                })
                .catch(err => {
                    console.log(err)
                });
        }
        getComComparaDia();
    }, [dataFiltro]);

    // Compras gráfico Lojas *************************
    useEffect(() => {
        async function getComGrafico() {
            await api.get('comgrafico')
                .then(cgrafico => {
                    const grafico = cgrafico.data.filter((graf) => (dtFormatada(graf.Atualizacao) === dtFormatada(dataFiltro)));
                    setComGrafico(grafico);
                })
                .catch(err => {
                    console.log(err)
                });
        }
        getComGrafico();
    }, [dataFiltro]);

    // Compras associacao Lojas *************************
    useEffect(() => {
        async function getComPerfAssoc() {
            await api.get('comperfassoc')
                .then(cassoc => {
                    const assoc = cassoc.data.filter((ass) => (dtFormatada(ass.Atualizacao) === dtFormatada(dataFiltro)));
                    assoc.sort((a, b) => parseInt(a.Compras) < parseInt(b.Compras) ? 1 : -1);
                    setComPerfAssoc(assoc);
                })
                .catch(err => {
                    console.log(err)
                });
        }
        getComPerfAssoc();
    }, [dataFiltro]);

    // Compras mes Lojas *************************
    useEffect(() => {
        async function getComPerfMes() {
            await api.get('comperfmes')
                .then(cmes => {
                    const mes = cmes.data.filter((ms) => (dtFormatada(ms.Atualizacao) === dtFormatada(dataFiltro)))
                        .sort((a, b) => parseInt(a.AnoMesNum) < parseInt(b.AnoMesNum) ? 1 : -1);
                    setComPerfMes(mes);
                })
                .catch(err => {
                    console.log(err)
                });
        }
        getComPerfMes();
    }, [dataFiltro]);

    // Compras mes Lojas *************************
    useEffect(() => {
        async function getComTotais() {
            await api.get('comtotais')
                .then(ctotais => {
                    const totais = ctotais.data.filter((tot) => (dtFormatada(tot.Atualizacao) === dtFormatada(dataFiltro)));
                    setComTotais(totais);
                })
                .catch(err => {
                    console.log(err)
                });
        }
        getComTotais();
    }, [dataFiltro]);

    /**
     * Load dados relatórios naturovos #########################################################################################################
     */

    // Faturamento diario Setor *************************

    useEffect(() => {
        async function getNfatuSetor() {
            await api.get('nfatusetor')
                .then(nfatset => {
                    const nfatsetor = nfatset.data.filter((nfs) => (dtFormatada(nfs.Atualizacao) === dtFormatada(dataFiltro)));
                    setNfatuSetor(nfatsetor);
                })
                .catch(err => {
                    console.log(err)
                });
        }
        getNfatuSetor();
    }, [dataFiltro]);

    // Faturamento diario Grupo *************************
    useEffect(() => {
        async function getNfatuGrupo() {
            await api.get('nfatugrupo')
                .then(nfatgru => {
                    const nfatgrupo = nfatgru.data.filter((nfg) => (dtFormatada(nfg.Atualizacao) === dtFormatada(dataFiltro)));
                    setNfatuGrupo(nfatgrupo);
                })
                .catch(err => {
                    console.log(err)
                });
        }
        getNfatuGrupo();
    }, [dataFiltro]);

    // Faturamento diario Assoc *************************
    useEffect(() => {
        async function getNfatuAssoc() {
            await api.get('nfatuassoc')
                .then(nfatass => {
                    const nfatassoc = nfatass.data.filter((nfa) => (dtFormatada(nfa.Atualizacao) === dtFormatada(dataFiltro)));
                    setNfatuAssoc(nfatassoc);
                })
                .catch(err => {
                    console.log(err)
                });
        }
        getNfatuAssoc();
    }, [dataFiltro]);

    // Faturamento diario Totais *************************
    useEffect(() => {
        async function getNfatuTotais() {
            await api.get('nfatutotais')
                .then(nfattot => {
                    const nfattotais = nfattot.data.filter((nft) => (dtFormatada(nft.Atualizacao) === dtFormatada(dataFiltro)));
                    setNfatuTotais(nfattotais);
                })
                .catch(err => {
                    console.log(err)
                });
        }
        getNfatuTotais();
    }, [dataFiltro]);

    // Faturamento diario Grafico *************************
    const [ nfatuGrafico, setNfatuGrafico ] = useState();

    useEffect(() => {
        async function getNfatuGrafico() {
            await api.get('nfatugrafico')
                .then(nfatgraf => {
                    const nfatgr = nfatgraf.data.filter((nfg) => (dtFormatada(nfg.Atualizacao) === dtFormatada(dataFiltro)));
                    setNfatuGrafico(nfatgr);
                })
                .catch(err => {
                    console.log(err)
                });
        }
        getNfatuGrafico();
    }, [dataFiltro]);

    // console.log(nfatuGrafico);
    return (

        <AuthContext.Provider value={{
            filiais,
            associacoes,
            exportacoes,
            totais,
            fatuLojas,
            fatuTotLojas,
            fatuGrafLojas,
            fatuPerfAssocLojas,
            fatuPerfMesLojas,
            fatuTotPerfLojas,
            serResumoDia,
            serPerform,
            serGrafico,
            serTotais,
            comComparaDia,
            comGrafico,
            comPerfAssoc,
            comPerfMes,
            comTotais,
            nfatuSetor,
            nfatuGrupo,
            nfatuAssoc,
            nfatuTotais,
            nfatuGrafico
        }}>
            {children}
        </AuthContext.Provider>

    );
}

