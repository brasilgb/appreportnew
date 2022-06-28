import React, { useState, useContext, useEffect } from 'react';
import { BoxButtom, ButtomSetores } from '../../components/Buttons';
import HeaderHome from '../../components/Header/Home';
import moment from 'moment';
import { AreaUm, BoxHome, ButtonArea, ContainerText, GraphArea, ScreenArea } from '../style';
import { AuthContext } from '../../contexts/auth';
import MoneyPTBR from '../../components/MoneyPTBR';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAnimation, VictoryLabel, VictoryPie } from "victory-native";
import Svg, { Text } from 'react-native-svg';

export default function Naturovos() {

  const { totais } = useContext(AuthContext);
  const vtotal = totais.filter((dep) => (dep.Departamento === 2)).map(tot => tot);

  const colorValid = ((value) => {
    if (value <= 90) return "#DC2626";
    if (value <= 98) return "#F18800";
    if (value > 90) return "#10B981";
  });

  const [metaAlc, setMetaAlc] = useState(0);
  const [margem, setMargem] = useState(0);
  const [projecao, setProjecao] = useState(0);

  const vmetaalcancada = (vtotal[0].MetaAlcancada) * 100;
  const vmargem = (vtotal[0].Margem) * 100;
  const vprojecao = (vtotal[0].Projecao) * 100;
  useEffect(() => {
    setMetaAlc(vmetaalcancada);
    setMargem(vmargem);
    setProjecao(vprojecao);
  }, [vmetaalcancada, vmargem, vprojecao])

  return (
    <BoxHome>
      <HeaderHome
        startColor="#FF710F"
        endColor="#f26000"
        textColor="#FFF"
        bgStatus="#f26000"
        barStyle="ligth-content"
        title="Supermercados"
        subTitle="Resumo de Faturamento"
        dtatu={moment(vtotal[0].Atualizacao).format('DD/MM/YYYY HH:mm:ss')}
      />
      <ScreenArea>

        <GraphArea>
          <AreaUm height="70px" paddingTop="">
            <ContainerText>
              <ContainerText.Title color="#0e98e5">Meta</ContainerText.Title>
              <ContainerText.Value color="#0e98e5"> <MoneyPTBR number={vtotal[0].Meta} /> </ContainerText.Value>
            </ContainerText>
            <ContainerText>
              <ContainerText.Title color={colorValid(vtotal[0].MetaAlcancada)}>Faturamento</ContainerText.Title>
              <ContainerText.Value color={colorValid(vtotal[0].MetaAlcancada)}> <MoneyPTBR number={parseFloat(vtotal[0].Faturamento)} /> </ContainerText.Value>
            </ContainerText>
          </AreaUm>

          <AreaUm height="120px" paddingTop="40px">
            <ContainerText>
              <ContainerText.Title color="#555" style={{ fontSize: 18 }}>Ticket Médio</ContainerText.Title>
              <ContainerText.Value color="#555" style={{ fontSize: 40, fontWeight: 'bold' }}> <MoneyPTBR number={parseFloat(vtotal[0].TicketMedio)} /> </ContainerText.Value>
            </ContainerText>

          </AreaUm>
          <AreaUm>
            <Svg width={200} height={200}>
              <VictoryPie
                standalone={false}
                animate={{ duration: 1000 }}
                padAngle={0}
                innerRadius={58}
                width={200}
                height={200}
                data={[{ 'key': "", 'y': margem }, { 'key': "", 'y': (100 - margem) }]}
                colorScale={[colorValid(margem), "#ccc"]}
                // cornerRadius={25}
                labelComponent={<Text />}
                labels={() => null}
              />
              <VictoryLabel
                textAnchor="middle" verticalAnchor="middle"
                x={100} y={120}
                text="Margem"
                style={{ fontSize: 14, fontFamily: "Roboto-Bold" }}
              />
              <VictoryAnimation duration={1000} delay={0} data={margem}>
                {(margem) => {
                  return (
                    <VictoryLabel
                      textAnchor="middle" verticalAnchor="middle"
                      x={100} y={90}
                      text={`${(parseFloat(margem).toFixed())}%`}
                      style={{ fontSize: 25, fontFamily: "Roboto-Bold" }}
                    />
                  );
                }}
              </VictoryAnimation>
            </Svg>
            <Svg width={200} height={200}>
              <VictoryPie
                standalone={false}
                animate={{ duration: 1000 }}
                padAngle={0}
                innerRadius={58}
                width={200}
                height={200}
                data={[{ 'key': "", 'y': projecao }, { 'key': "", 'y': (100 - projecao) }]}
                colorScale={[colorValid(projecao), "#ccc"]}
                // cornerRadius={25}
                labelComponent={<Text />}
                labels={() => null}
              />
              <VictoryLabel
                textAnchor="middle" verticalAnchor="middle"
                x={100} y={120}
                text="Projeção"
                style={{ fontSize: 14, fontFamily: "Roboto-Bold" }}
              />
              <VictoryAnimation duration={1000} delay={0} data={projecao}>
                {(projecao) => {
                  return (
                    <VictoryLabel
                      textAnchor="middle" verticalAnchor="middle"
                      x={100} y={90}
                      text={`${(parseFloat(projecao).toFixed())}%`}
                      style={{ fontSize: 25, fontFamily: "Roboto-Bold" }}
                    />
                  );
                }}
              </VictoryAnimation>
            </Svg>
          </AreaUm>

        </GraphArea>

        <ButtonArea>

          <BoxButtom>

            <ButtomSetores
              startColor="#FF710F"
              endColor="#f26000"
              textColor="#FFF"
              icon="ios-list-sharp"
              title="Resumo"
              onPress="ResumoSuper"
            />

            <ButtomSetores
              startColor="#FF710F"
              endColor="#f26000"
              textColor="#FFF"
              icon="ios-logo-usd"
              title="Faturamento"
              onPress="SFaturamento"
            />

            <ButtomSetores
              startColor="#FF710F"
              endColor="#f26000"
              textColor="#FFF"
              icon="md-cart-outline"
              title="Compras"
              onPress="SCompras"
            />

          </BoxButtom>

        </ButtonArea>
      </ScreenArea>
    </BoxHome>
  );
}