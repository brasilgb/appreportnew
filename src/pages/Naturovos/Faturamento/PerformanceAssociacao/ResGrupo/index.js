import React, { useContext, useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { DataTable } from 'react-native-paper';
import MoneyPTBR from '../../../../../components/MoneyPTBR';
import { AuthContext } from '../../../../../contexts/auth';
import { ScrollView } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import Icon from 'react-native-vector-icons/Ionicons';
import ResAssoc from '../ResAssoc';

export default function ResGrupo({ setorName, nfatuPerfGrupo }) {

    const { width, height } = Dimensions.get('screen');
    const modalizeRef = useRef(null);

    const {
        nfatuPerfAssoc,
    } = useContext(AuthContext);

    const [grupoName, setGrupoName] = useState('');

    const openAssoc = () => {
        modalizeRef.current?.open();
    };

    const nameGrupo = (setor) => {
        setGrupoName(setor);
    };

    return (

        <View style={styles.container}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <DataTable>
                    <DataTable.Header style={{ backgroundColor: '#E5E5EA' }}>
                        <DataTable.Title style={styles.colgrande}>Grupo</DataTable.Title>
                        <DataTable.Title style={styles.colgrande}>Faturamento</DataTable.Title>
                        <DataTable.Title style={styles.colpequena}>Margem</DataTable.Title>
                        <DataTable.Title style={styles.colpequena}>Rep. Total</DataTable.Title>
                        <DataTable.Title style={styles.colpequena}>Preço Médio</DataTable.Title>
                        <DataTable.Title style={styles.colmedia}>Preço Méd. Kg/Liq</DataTable.Title>
                        <DataTable.Title style={styles.colgrande}>Fatu. + EC</DataTable.Title>
                        <DataTable.Title style={styles.colpequena}>Rep. + EC</DataTable.Title>
                        <DataTable.Title style={styles.colpequena}>Margem + EC</DataTable.Title>
                    </DataTable.Header>

                    <ScrollView showsVerticalScrollIndicator={false}>

                        {nfatuPerfGrupo.filter((filg) => (filg.Setor === setorName))
                            .sort((a, b) => (parseFloat(a.Faturamento) < parseFloat(b.Faturamento)) ? 1 : -1)
                            .map((fat, index) => (

                                <DataTable.Row key={index} style={{ backgroundColor: index % 2 === 0 ? '#F3F4F6' : '#F9FAFB' }}>
                                    <DataTable.Cell style={styles.colgrande}>
                                        <TouchableOpacity onPress={() => { openAssoc(); nameGrupo(fat.Grupo) }} style={styles.btnModal} >
                                            <Icon style={{ marginRight: 2, paddingTop: 3 }} name="ios-arrow-redo" size={14} color="#333" />
                                            <Text style={{ color: '#333' }}>{fat.Grupo}</Text>
                                        </TouchableOpacity>
                                    </DataTable.Cell>
                                    <DataTable.Cell style={styles.colgrande}>{<MoneyPTBR number={((fat.Faturamento) * 1)} />}</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>{((fat.Margem) * 100).toFixed(2)}%</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>{((fat.RepTotal) * 100).toFixed(2)}%</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>{<MoneyPTBR number={((fat.PrecoMedio) * 1)} />}</DataTable.Cell>
                                    <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.PrecoMedioKg) * 1)} />}%</DataTable.Cell>
                                    <DataTable.Cell style={styles.colgrande}>{<MoneyPTBR number={((fat.FaturamentoEC) * 1)} />}</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>{((fat.RepEC) * 100).toFixed(2)}%</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>{((fat.MargemEC) * 100).toFixed(2)}%</DataTable.Cell>

                                </DataTable.Row>
                            ))}
                    </ScrollView>

                </DataTable>
            </ScrollView>



            <Modalize
                ref={modalizeRef}
                snapPoint={height / 1.7}
                modalHeight={height / 1.7}
            >
                <ResAssoc grupoName={grupoName} nfatuPerfAssoc={nfatuPerfAssoc} />
            </Modalize>


        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    colgrande: {
        width: 150,
        paddingHorizontal: 2
    },
    colmedia: {
        width: 120,
        paddingHorizontal: 2
    },
    colpequena: {
        width: 80,
        paddingHorizontal: 2
    },
    colmin: {
        width: 50,
        paddingHorizontal: 2
    },
    btnModal: {
        width: 130,
        flexDirection: "row",
        backgroundColor: "#fcbc32",
        borderRadius: 4,
        paddingVertical: 2,
        paddingHorizontal: 5,
        borderWidth: 1,
        borderColor: '#F5AB00'
    }
});