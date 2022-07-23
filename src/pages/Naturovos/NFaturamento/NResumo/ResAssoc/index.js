import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { DataTable } from 'react-native-paper';
import MoneyPTBR from '../../../../../components/MoneyPTBR';
import { ScrollView } from 'react-native-gesture-handler';

export default function ResGrupo({ grupoName, nfatuAssoc }) {

    return (
        <View style={styles.container}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <DataTable>
                    <DataTable.Header style={{ backgroundColor: '#E5E5EA' }}>
                        <DataTable.Title style={styles.colmedia}>Assoc.</DataTable.Title>

                        <DataTable.Title style={styles.colmedia}>Venda Dia</DataTable.Title>
                        <DataTable.Title style={styles.colpequena}>Margem</DataTable.Title>

                        <DataTable.Title style={styles.colmedia}>Venda Semana</DataTable.Title>
                        <DataTable.Title style={styles.colpequena}>Margem</DataTable.Title>

                        <DataTable.Title style={styles.colmedia}>Venda Mês</DataTable.Title>
                        <DataTable.Title style={styles.colpequena}>Margem</DataTable.Title>

                        <DataTable.Title style={styles.colpequena}>Rep. Total</DataTable.Title>
                        <DataTable.Title style={styles.colpequena}></DataTable.Title>

                        <DataTable.Title style={styles.colpequena}>Preço Médio</DataTable.Title>
                        <DataTable.Title style={styles.colpequena}></DataTable.Title>
                        <DataTable.Title style={styles.colpequena}>Preç. Méd. Kg</DataTable.Title>
                        <DataTable.Title style={styles.colpequena}></DataTable.Title>
                    </DataTable.Header>

                    <ScrollView showsVerticalScrollIndicator={false}>

                        {nfatuAssoc.filter((filg) => (filg.Grupo == grupoName))
                            .sort((a, b) => (parseFloat(a.VendaMes) < parseFloat(b.VendaMes)) ? 1 : -1)
                            .map((fat, index) => (

                                <DataTable.Row key={index} style={{ backgroundColor: index % 2 === 0 ? '#F3F4F6' : '#F9FAFB' }}>
                                    <DataTable.Cell style={styles.colmedia}>
                                            <Text>{fat.Associacao}</Text>
                                    </DataTable.Cell>

                                    <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.VendaDia) * 1)} />}</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>{((fat.MargemDia) * 100).toFixed(2)}%</DataTable.Cell>

                                    <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.VendaSemana) * 1)} />}</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>{((fat.MargemSemana) * 100).toFixed(2)}%</DataTable.Cell>

                                    <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.VendaMes) * 1)} />}</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>{((fat.MargemMes) * 100).toFixed(2)}%</DataTable.Cell>

                                    <DataTable.Cell style={styles.colpequena}>{((fat.RepTotal) * 100).toFixed(2)}%</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>
                                        <Text
                                            style={((fat.RepAno) * 100).toFixed(2) > 0 ? { color: 'green' } : { color: 'red' }}
                                        >
                                            {((fat.RepAno) * 100).toFixed(2)}%
                                        </Text>
                                    </DataTable.Cell>

                                    <DataTable.Cell style={styles.colpequena}>{<MoneyPTBR number={((fat.PrecoMedio) * 1)} />}</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>
                                        <Text
                                            style={((fat.RepPrecoMedio) * 100).toFixed(2) > 0 ? { color: 'green' } : { color: 'red' }}
                                        >
                                            {((fat.RepPrecoMedio) * 100).toFixed(2)}%
                                        </Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>{<MoneyPTBR number={((fat.PrecoMedioKg) * 1)} />}</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>{((fat.RepPrecoMedioKg) * 100).toFixed(2)}%</DataTable.Cell>

                                </DataTable.Row>
                            ))}
                    </ScrollView>

                </DataTable>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    colgrande: {
        width: 180,
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
    }
});