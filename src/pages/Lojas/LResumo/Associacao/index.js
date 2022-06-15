import React, { useContext } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import MoneyPTBR from '../../../../components/MoneyPTBR';
import { AuthContext } from '../../../../contexts/auth';

export default function Associacao() {

    const { associacoes, totais } = useContext(AuthContext);

    const vassociacao = associacoes.filter((ass) => (ass.Departamento === 1));
    const vtotal = totais.filter((tot) => (tot.Departamento === 1));

    return (
        <View style={styles.container}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <DataTable>
                    <DataTable.Header style={{ backgroundColor: '#E5E5EA' }}>
                        <DataTable.Title style={styles.colpequena}>Assoc.</DataTable.Title>
                        <DataTable.Title style={styles.colgrande}>Faturamento</DataTable.Title>
                        <DataTable.Title style={styles.colpequena}>Rep.Fat</DataTable.Title>
                        <DataTable.Title style={styles.colpequena}>Proj.</DataTable.Title>
                        <DataTable.Title style={styles.colpequena}>Margem</DataTable.Title>
                        <DataTable.Title style={styles.colpequena}>Meta</DataTable.Title>
                    </DataTable.Header>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        {vtotal.map((tot, index) => (
                            <DataTable.Row key={index} style={{ backgroundColor: '#E5E5EA' }}>
                                <DataTable.Cell style={styles.colpequena}>Total</DataTable.Cell>
                                <DataTable.Cell style={styles.colgrande}><MoneyPTBR number={parseFloat(tot.Faturamento)} /></DataTable.Cell>
                                <DataTable.Cell style={styles.colpequena}>{((1) * 100).toFixed(2)}%</DataTable.Cell>
                                <DataTable.Cell style={styles.colpequena}>{((tot.Projecao) * 100).toFixed(2)}%</DataTable.Cell>
                                <DataTable.Cell style={styles.colpequena}>{((tot.Margem) * 100).toFixed(2)}%</DataTable.Cell>
                                <DataTable.Cell style={styles.colpequena}>{((tot.MetaAlcancada) * 100).toFixed(2)}%</DataTable.Cell>
                            </DataTable.Row>
                        ))}
                        {vassociacao.map((fil, index) => (
                            <DataTable.Row key={index} style={{ backgroundColor:  index%2 === 0 ? '#F3F4F6' : '#F9FAFB' }}>
                                <DataTable.Cell style={styles.colpequena}>{fil.Associacao}</DataTable.Cell>
                                <DataTable.Cell style={styles.colgrande}>{<MoneyPTBR number={parseFloat(fil.Faturamento)} />}</DataTable.Cell>
                                <DataTable.Cell style={styles.colpequena}>{((fil.RepFaturamento) * 100).toFixed(2)}%</DataTable.Cell>
                                <DataTable.Cell style={styles.colpequena}>{((fil.Projecao) * 100).toFixed(2)}%</DataTable.Cell>
                                <DataTable.Cell style={styles.colpequena}>{((fil.Margem) * 100).toFixed(2)}%</DataTable.Cell>
                                <DataTable.Cell style={styles.colpequena}>{((fil.MetaAlcancada) * 100).toFixed(2)}%</DataTable.Cell>
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
        backgroundColor: "#FFF",
        paddingTop: 0
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
    }
});