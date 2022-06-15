import React from 'react';
import { VictoryAnimation, VictoryLabel, VictoryPie } from "victory-native";
import Svg, { Text } from 'react-native-svg';

export default function Progress({ bgcolor, value }) {

    
    return (
        <Svg width={200} height={200}>
        <VictoryPie
          //standalone={false}
          animate={{ duration: 1000 }}
          padAngle={0}
          innerRadius={58}
          width={200}
          height={200}
          data={[{ 'key': "", 'y': value }, { 'key': "", 'y': (100 - value) }]}
          colorScale={[bgcolor, "#ccc"]}
          // cornerRadius={25}
        //   labelComponent={<Text />}
          labels={() => null}
        />
        
        <VictoryLabel
          textAnchor="middle" 
          verticalAnchor="middle"
          x={100} y={120}
          text="Alcançada"
          style={{ fontSize: 14, fontFamily: "Roboto-Bold" }}
        />
        <VictoryAnimation duration={1000} data={value}>
          {(value) => {
            return (
              <VictoryLabel
                textAnchor="middle" verticalAnchor="middle"
                x={100} y={90}
                text={`${(parseFloat(value).toFixed())}%`}
                style={{ fontSize: 30, fontFamily: "Roboto-Bold" }}
              />
            );
          }}
        </VictoryAnimation>
      </Svg>
    );
}