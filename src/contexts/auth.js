import React, { useState, createContext, useEffect } from 'react';
import api from '../services/api'
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingCalendar, setLoadingCalendar] = useState(false);
    const [loadingAuth, setLoadingAuth] = useState(false);

    // Data Resumos
    const [filiais, setFiliais] = useState([]);
    const [associacoes, setAssociacoes] = useState([]);
    const [exportacoes, setExportacoes] = useState([]);
    const [totais, setTotais] = useState([]);

    // Data Faturamento lojas
    const [fatuLojas, setFatuLojas] = useState([]);
    const [fatuTotLojas, setFatuTotLojas] = useState([]);
    const [fatuGrafLojas, setFatuGrafLoja] = useState([]);
    const [fatuPerfAssocLojas, setFatuPerfAssocLojas] = useState([]);
    const [fatuPerfMesLojas, setFatuPerfMesLojas] = useState([]);
    const [fatuTotPerfLojas, setFatuTotPerfLojas] = useState([]);

    // Data Serviços Lojas
    const [serResumoDia, setSerResumoDia] = useState([]);
    const [serPerform, setSerPerform] = useState([]);
    const [serGrafico, setSerGrafico] = useState([]);
    const [serTotais, setSerTotais] = useState([]);

    // Data Compras Lojas
    const [comComparaDia, setComComparaDia] = useState([]);
    const [comPerfMes, setComPerfMes] = useState([]);
    const [comPerfAssoc, setComPerfAssoc] = useState([]);
    const [comGrafico, setComGrafico] = useState([]);
    const [comTotais, setComTotais] = useState([]);

    // Data faturamento Naturovos
    const [nfatuSetor, setNfatuSetor] = useState([]);
    const [nfatuGrupo, setNfatuGrupo] = useState([]);
    const [nfatuAssoc, setNfatuAssoc] = useState([]);
    const [nfatuPerfSetor, setNfatuPerfSetor] = useState([]);
    const [nfatuPerfGrupo, setNfatuPerfGrupo] = useState([]);
    const [nfatuPerfAssoc, setNfatuPerfAssoc] = useState([]);
    const [nfatuPerfMes, setNfatuPerfMes] = useState([]);
    const [nfatuGrafico, setNfatuGrafico] = useState([]);
    const [nfatuTotais, setNfatuTotais] = useState([]);

    // Data Compras Naturovos
    const [nComTipo, setNComTipo] = useState([]);
    const [nComGrafico, setNComGrafico] = useState([]);
    const [nComPerfMes, setNComPerfMes] = useState([]);
    const [nComPerfTipo, setNComPerfTipo] = useState([]);
    const [nComTotal, setNComTotal] = useState([]);

    // Data Resumo Naturovos
    const [nResGrupo, setNResGrupo] = useState([]);
    const [nResAssoc, setNResAssoc] = useState([]);
    const [nResGrafico, setNResGrafico] = useState([]);
    const [nResTotal, setNResTotal] = useState([]);

    // Data Faturamento Supermercados
    const [sFatComparativo, setSFatComparativo] = useState([]);
    const [sFatGrafico, setSFatGrafico] = useState([]);
    const [sFatPerfAssoc, setSFatPerfAssoc] = useState([]);
    const [sFatPerfMes, setSFatPerfMes] = useState([]);
    const [sFatTotais, setSFatTotais] = useState([]);

    // Data Compras Supermercados
    const [sComComparativo, setSComComparativo] = useState([]);
    const [sComGrafico, setSComGrafico] = useState([]);
    const [sComPerfAssoc, setSComPerfAssoc] = useState([]);
    const [sComPerfMes, setSComPerfMes] = useState([]);
    const [sComTotais, setSComTotais] = useState([]);



    const [dataFiltro, setDataFiltro] = useState(new Date());

    const dtFormatada = (date) => {
        return moment(date).format('YYYY-MM-DD');
    }

    function calendarData(dataf) {
        setDataFiltro(dataf);
        setLoadingCalendar(true);
    }

    // Armazena usuário no storage
    useEffect(() => {
        async function loadStorage() {
            const storageUser = await AsyncStorage.getItem('Auth_user');
            if (storageUser) {
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }
            setLoading(false);
        }
        loadStorage();
    }, []);

    //Funcao para logar o usario
    async function signIn(code, password) {
        setLoadingAuth(true);
        await api.post('login', { code: code, password: password })
            .then((usuario) => {
                if (usuario.data.sigIn.success) {
                    let udata = {
                        IdUsuario: usuario.data.sigIn.user.idusuario,
                        Name: usuario.data.sigIn.user.name,
                        Filial: usuario.data.sigIn.user.filial,
                        Type: usuario.data.sigIn.user.type,
                        Code: usuario.data.sigIn.user.code,
                        Rule: usuario.data.sigIn.user.rule
                    };
                    console.log(udata);
                    setUser(udata);
                    storageUser(udata);
                    setLoadingAuth(false);
                } else {
                    Alert.alert('Algo deu errado!', 'Redigite seu Email e/ou Senha!');
                    setLoadingAuth(false);
                }

            })
            .catch((error) => {
                alert(error);
                setLoadingAuth(false);
            });
    }

    async function storageUser(data) {
        await AsyncStorage.setItem('Auth_user', JSON.stringify(data));
    }

    async function signOut() {
        await AsyncStorage.clear()
            .then(() => {
                setUser(null);
            })
    }




    // Extração de dados resumos filiais
    useEffect(() => {
        async function getFiliais() {
            await api.get(`filiais/${dtFormatada(dataFiltro)}`)
                .then(filiais => {
                    setFiliais(filiais.data);
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
            await api.get(`associacoes/${dtFormatada(dataFiltro)}`)
                .then(associacoes => {
                    setAssociacoes(associacoes.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getAssociacoes();
    }, [dataFiltro]);
    // console.log(associacoes);

    // Extração de dados resumos Exportações
    useEffect(() => {
        async function getExportacoes() {
            await api.get(`exportacoes/${dtFormatada(dataFiltro)}`)
                .then(exportacoes => {
                    setExportacoes(exportacoes.data);
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
            await api.get(`totais/${dtFormatada(dataFiltro)}`)
                .then(totais => {
                    setTotais(totais.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getTotais();
    }, [dataFiltro]);
    console.log(totais);
    // Extração de dados do faturamento
    useEffect(() => {
        async function getFatuLojas() {
            await api.get(`fatulojas/${dtFormatada(dataFiltro)}`)
                .then(fatulojas => {
                    setFatuLojas(fatulojas.data);
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
            await api.get(`fatutotlojas/${dtFormatada(dataFiltro)}`)
                .then(fatutotlojas => {
                    setFatuTotLojas(fatutotlojas.data);
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
            await api.get(`fatugraflojas/${dtFormatada(dataFiltro)}`)
                .then(fatugraflojas => {
                    setFatuGrafLoja(fatugraflojas.data);
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
            await api.get(`fatuperfassoclojas/${dtFormatada(dataFiltro)}`)
                .then(fatuperfassoclojas => {
                    setFatuPerfAssocLojas(fatuperfassoclojas.data);
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
            await api.get(`fatuperfmeslojas/${dtFormatada(dataFiltro)}`)
                .then(fatuperfmeslojas => {
                    setFatuPerfMesLojas(fatuperfmeslojas.data);
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
            await api.get(`fatutotperflojas/${dtFormatada(dataFiltro)}`)
                .then(fatutotperflojas => {
                    setFatuTotPerfLojas(fatutotperflojas.data);
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
            await api.get(`serresumodia/${dtFormatada(dataFiltro)}`)
                .then(serresumodia => {
                    setSerResumoDia(serresumodia.data);
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
            await api.get(`serperform/${dtFormatada(dataFiltro)}`)
                .then(sperform => {
                    setSerPerform(sperform.data);
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
            await api.get(`sergrafico/${dtFormatada(dataFiltro)}`)
                .then(sgrafico => {
                    setSerGrafico(sgrafico.data);
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
            await api.get(`sertotais/${dtFormatada(dataFiltro)}`)
                .then(stotais => {
                    setSerTotais(stotais.data);

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
            await api.get(`comcomparadia/${dtFormatada(dataFiltro)}`)
                .then(ccompara => {
                    setComComparaDia(ccompara.data);
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
            await api.get(`comgrafico/${dtFormatada(dataFiltro)}`)
                .then(cgrafico => {
                    setComGrafico(cgrafico.data);
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
            await api.get(`comperfassoc/${dtFormatada(dataFiltro)}`)
                .then(cassoc => {
                    setComPerfAssoc(cassoc.data);
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
            await api.get(`comperfmes/${dtFormatada(dataFiltro)}`)
                .then(cmes => {
                    setComPerfMes(cmes.data);
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
            await api.get(`comtotais/${dtFormatada(dataFiltro)}`)
                .then(ctotais => {
                    setComTotais(ctotais.data);
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
            await api.get(`nfatusetor/${dtFormatada(dataFiltro)}`)
                .then(nfatsetor => {
                    setNfatuSetor(nfatsetor.data);
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
            await api.get(`nfatugrupo/${dtFormatada(dataFiltro)}`)
                .then(nfatgrupo => {
                    setNfatuGrupo(nfatgrupo.data);
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
            await api.get(`nfatuassoc/${dtFormatada(dataFiltro)}`)
                .then(nfatassoc => {
                    setNfatuAssoc(nfatassoc.data);
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
            await api.get(`nfatutotais/${dtFormatada(dataFiltro)}`)
                .then(nfattotais => {
                    setNfatuTotais(nfattotais.data);
                })
                .catch(err => {
                    console.log(err)
                });
        }
        getNfatuTotais();
    }, [dataFiltro]);

    // Faturamento diario Grafico *************************
    useEffect(() => {
        async function getNfatuGrafico() {
            await api.get(`nfatugrafico/${dtFormatada(dataFiltro)}`)
                .then(nfatgraf => {
                    setNfatuGrafico(nfatgraf.data);
                })
                .catch(err => {
                    console.log(err)
                });
        }
        getNfatuGrafico();
    }, [dataFiltro]);


    // Faturamento Associação Setor *************************
    useEffect(() => {
        async function getNfatuPerfSetor() {
            await api.get(`nfatuperfsetor/${dtFormatada(dataFiltro)}`)
                .then(nfatsetor => {
                    setNfatuPerfSetor(nfatsetor.data);
                })
                .catch(err => {
                    console.log(err)
                });
        }
        getNfatuPerfSetor();
    }, [dataFiltro]);

    // Faturamento Associação Grupo *************************
    useEffect(() => {
        async function getNfatuPerfGrupo() {
            await api.get(`nfatuperfgrupo/${dtFormatada(dataFiltro)}`)
                .then(nfatgrupo => {
                    setNfatuPerfGrupo(nfatgrupo.data);
                })
                .catch(err => {
                    console.log(err)
                });
        }
        getNfatuPerfGrupo();
    }, [dataFiltro]);

    // Faturamento Associação Associação *************************
    useEffect(() => {
        async function getNfatuPerfAssoc() {
            await api.get(`nfatuperfassoc/${dtFormatada(dataFiltro)}`)
                .then(nfatassoc => {
                    setNfatuPerfAssoc(nfatassoc.data);
                })
                .catch(err => {
                    console.log(err)
                });
        }
        getNfatuPerfAssoc();
    }, [dataFiltro]);

    // Faturamento Associação Associação *************************
    useEffect(() => {
        async function getNfatuPerfMes() {
            await api.get(`nfatuperfmes/${dtFormatada(dataFiltro)}`)
                .then(nfatumeses => {
                    setNfatuPerfMes(nfatumeses.data);
                })
                .catch(err => {
                    console.log(err)
                });
        }
        getNfatuPerfMes();
    }, [dataFiltro]);

    // Compras Naturovos Resumo diário *************************
    useEffect(() => {
        async function getNComTipo() {
            await api.get(`ncomtipo/${dtFormatada(dataFiltro)}`)
                .then(ncomtipo => {
                    setNComTipo(ncomtipo.data);
                })
                .catch(err => {
                    console.log(err)
                });
        }
        getNComTipo();
    }, [dataFiltro]);

    // Compras Naturovos Gráfico *************************
    useEffect(() => {
        async function getNComGrafico() {
            await api.get(`ncomgrafico/${dtFormatada(dataFiltro)}`)
                .then(ncomgrafico => {
                    setNComGrafico(ncomgrafico.data);
                })
                .catch(err => {
                    console.log(err)
                });
        }
        getNComGrafico();
    }, [dataFiltro]);

    // Compras Naturovos Performance Mês *************************
    useEffect(() => {
        async function getNComPerfMes() {
            await api.get(`ncomperfmes/${dtFormatada(dataFiltro)}`)
                .then(ncompmes => {
                    setNComPerfMes(ncompmes.data);
                })
                .catch(err => {
                    console.log(err)
                });
        }
        getNComPerfMes();
    }, [dataFiltro]);

    // Compras Naturovos Performance Tipo *************************
    useEffect(() => {
        async function getNComPerfTipo() {
            await api.get(`ncomperftipo/${dtFormatada(dataFiltro)}`)
                .then(ncomptipo => {
                    setNComPerfTipo(ncomptipo.data);
                })
                .catch(err => {
                    console.log(err)
                });
        }
        getNComPerfTipo();
    }, [dataFiltro]);

    // Compras Naturovos Performance Total *************************
    useEffect(() => {
        async function getNComTotal() {
            await api.get(`ncomtotal/${dtFormatada(dataFiltro)}`)
                .then(ncomtotal => {
                    setNComTotal(ncomtotal.data);
                })
                .catch(err => {
                    console.log(err)
                });
        }
        getNComTotal();
    }, [dataFiltro]);

    // Compras Naturovos Resumo Associação *************************
    useEffect(() => {
        async function getNResTotal() {
            await api.get(`nrestotais/${dtFormatada(dataFiltro)}`)
                .then(nrestot => {
                    setNResTotal(nrestot.data);
                })
                .catch(err => {
                    console.log(err)
                });
        }
        getNResTotal();
    }, [dataFiltro]);

    // Compras Naturovos Resumo Associação *************************
    useEffect(() => {
        async function getNResGrafico() {
            await api.get(`nresgrafico/${dtFormatada(dataFiltro)}`)
                .then(nresgraf => {
                    setNResGrafico(nresgraf.data);
                })
                .catch(err => {
                    console.log(err)
                });
        }
        getNResGrafico();
    }, [dataFiltro]);

    // Compras Naturovos Resumo Grupo *************************
    useEffect(() => {
        async function getNResGrupo() {
            await api.get(`nresgrupo/${dtFormatada(dataFiltro)}`)
                .then(nrgpr => {
                    setNResGrupo(nrgpr.data);
                })
                .catch(err => {
                    console.log(err)
                });
        }
        getNResGrupo();
    }, [dataFiltro]);

    // Compras Naturovos Resumo Associação *************************
    useEffect(() => {
        async function getNResAssoc() {
            await api.get(`nresassoc/${dtFormatada(dataFiltro)}`)
                .then(assoc => {
                    setNResAssoc(assoc.data);
                })
                .catch(err => {
                    console.log(err)
                });
        }
        getNResAssoc();
    }, [dataFiltro]);

    /**
     * Load dados relatórios supermercados #########################################################################################################
     */

    // Faturamento Supermercados Faturamento Totais Faturamento *************************
    useEffect(() => {
        async function getSFatTotais() {
            await api.get(`sfattotais/${dtFormatada(dataFiltro)}`)
                .then(sftot => {
                    setSFatTotais(sftot.data);
                })
                .catch(err => {
                    console.log(err)
                });
        }
        getSFatTotais();

    }, [dataFiltro]);

    // Faturamento Supermercados Faturamento Performance Mês *************************
    useEffect(() => {
        async function getSFatPerfMes() {
            await api.get(`sfatperfmes/${dtFormatada(dataFiltro)}`)
                .then(sfpermes => {
                    setSFatPerfMes(sfpermes.data);
                })
                .catch(err => {
                    console.log(err)
                });
        }
        getSFatPerfMes();
    }, [dataFiltro]);

    // Faturamento Supermercados Faturamento Performance Associação *************************
    useEffect(() => {
        async function getSFatPerfAssoc() {
            await api.get(`sfatperfassoc/${dtFormatada(dataFiltro)}`)
                .then(sfperass => {
                    setSFatPerfAssoc(sfperass.data);
                })
                .catch(err => {
                    console.log(err)
                });
        }
        getSFatPerfAssoc();
    }, [dataFiltro]);

    // Faturamento Supermercados Faturamento Gráfico *************************
    useEffect(() => {
        async function getSFatGrafico() {
            await api.get(`sfatgrafico/${dtFormatada(dataFiltro)}`)
                .then(sfgraf => {
                    setSFatGrafico(sfgraf.data);
                })
                .catch(err => {
                    console.log(err)
                });
        }
        getSFatGrafico();
    }, [dataFiltro]);

    // Faturamento Supermercados Faturamento Comparativo diário *************************
    useEffect(() => {
        async function getSFatComparativo() {
            await api.get(`sfatcomparativo/${dtFormatada(dataFiltro)}`)
                .then(sfcom => {
                    setSFatComparativo(sfcom.data);
                })
                .catch(err => {
                    console.log(err)
                });
        }
        getSFatComparativo();
    }, [dataFiltro]);

    // Compras Supermercados Compras Totais *************************
    useEffect(() => {
        async function getSComTotais() {
            await api.get(`scomtotais/${dtFormatada(dataFiltro)}`)
                .then(scomtot => {
                    setSComTotais(scomtot.data);
                })
                .catch(err => {
                    console.log(err)
                });
        }
        getSComTotais();
    }, [dataFiltro]);

    // Compras Supermercados Compras Performance Mês *************************
    useEffect(() => {
        async function getSComPerfMes() {
            await api.get(`scomperfmes/${dtFormatada(dataFiltro)}`)
                .then(scpermes => {
                    setSComPerfMes(scpermes.data);
                })
                .catch(err => {
                    console.log(err)
                });
        }
        getSComPerfMes();
        //     const interval = setInterval(() => {
        //         getSComPerfMes();
        //     }, 10000);
        // return () => clearInterval(interval);
    }, [dataFiltro]);

    // Compras Supermercados Compras Performance Associação *************************
    useEffect(() => {
        async function getSComPerfAssoc() {
            await api.get(`scomperfassoc/${dtFormatada(dataFiltro)}`)
                .then(scperass => {
                    setSComPerfAssoc(scperass.data);
                })
                .catch(err => {
                    console.log(err)
                });
        }
        getSComPerfAssoc();
    }, [dataFiltro]);

    // Compras Supermercados Compras Gráfico *************************
    useEffect(() => {
        async function getSComGrafico() {
            await api.get(`scomgrafico/${dtFormatada(dataFiltro)}`)
                .then(scgraf => {
                    setSComGrafico(scgraf.data);
                })
                .catch(err => {
                    console.log(err)
                });
        }
        getSComGrafico();
    }, [dataFiltro]);

    // Compras Supermercados Faturamento Comparativo diário *************************
    useEffect(() => {
        async function getSComComparativo() {
            await api.get(`scomcomparativo/${dtFormatada(dataFiltro)}`)
                .then(sccomp => {
                    setSComComparativo(sccomp.data);
                })
                .catch(err => {
                    console.log(err)
                });
        }
        getSComComparativo();
        const interval = setInterval(() => {
            getSComComparativo();
        }, 10000);
        return () => clearInterval(interval);
    }, [dataFiltro]);

    return (

        <AuthContext.Provider value={{
            signed: !!user,
            user,
            signIn,
            signOut,
            loadingAuth,
            loadingCalendar,
            calendarData,
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
            nfatuPerfSetor,
            nfatuPerfGrupo,
            nfatuPerfAssoc,
            nfatuPerfMes,
            nfatuTotais,
            nfatuGrafico,
            nComTipo,
            nComGrafico,
            nComPerfMes,
            nComPerfTipo,
            nComTotal,
            nResGrupo,
            nResAssoc,
            nResGrafico,
            nResTotal,
            sFatComparativo,
            sFatGrafico,
            sFatPerfAssoc,
            sFatPerfMes,
            sFatTotais,
            sComComparativo,
            sComGrafico,
            sComPerfAssoc,
            sComPerfMes,
            sComTotais
        }}>
            {children}
        </AuthContext.Provider>

    );
}