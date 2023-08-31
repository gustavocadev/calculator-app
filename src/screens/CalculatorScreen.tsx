import {View, Text} from 'react-native';
import React, {useRef, useState} from 'react';
import {styles} from '../theme/appTheme';
import ButtonCalc from '../components/ButtonCalc';

enum Operators {
  sum,
  substract,
  multiply,
  divide,
}

const CalculatorScreen = () => {
  const [previousNumber, setPreviousNumber] = useState('0');
  const [number, setNumber] = useState<string>('0');
  const lastOperationRef = useRef<Operators>();

  const clean = () => {
    setNumber('0');
    setPreviousNumber('0');
  };
  const removeLastNumber = () => {
    const removeLast = number.split('').map((num, idx) => {
      if (number.length - 1 === 0) return '0';

      if (number.length - 1 === idx) return '';

      if (number.startsWith('-') && number.length - 2 === idx) return '0';

      return num;
    });

    setNumber(removeLast.join(''));
  };

  const changeNumberByPrevious = () => {
    if (number.endsWith('.')) {
      setPreviousNumber(number.slice(0, -1));
    } else {
      setPreviousNumber(number);
    }
    setNumber('0');
  };

  const buildNumber = (textNumber: string) => {
    // if already exists a point, and the user press another point, return
    if (number.includes('.') && textNumber === '.') return;

    // if the user press a point and the number is 0, add the point
    if (number.startsWith('0') || textNumber.startsWith('-0')) {
      if (textNumber === '.') {
        setNumber(number + textNumber);
      } else if (textNumber === '0' && number.includes('.')) {
        setNumber(number + textNumber);

        // if the user press a number and the number is if different to 0, replace the number
      } else if (textNumber !== '0' && !number.includes('.')) {
        setNumber(textNumber);
      } else if (textNumber === '0' && !number.includes('.')) {
        setNumber(number);
      } else {
        setNumber(number + textNumber);
      }
    } else {
      setNumber(number + textNumber);
    }
  };

  const negativePositive = () => {
    if (number.includes('-')) {
      setNumber(number.replace('-', ''));
      return;
    }

    setNumber('-' + number);
  };

  const btnDividir = () => {
    changeNumberByPrevious();
    lastOperationRef.current = Operators.divide;
  };

  const btnMultiplicar = () => {
    changeNumberByPrevious();
    lastOperationRef.current = Operators.multiply;
  };

  const btnRestar = () => {
    changeNumberByPrevious();
    lastOperationRef.current = Operators.substract;
  };

  const btnSumar = () => {
    changeNumberByPrevious();
    lastOperationRef.current = Operators.sum;
  };

  const calc = () => {
    if (previousNumber === '0') return setNumber(number);

    const num1 = Number(number);
    const num2 = Number(previousNumber);

    switch (lastOperationRef.current) {
      case Operators.sum:
        setNumber(`${num1 + num2}`);
        break;

      case Operators.substract:
        setNumber(`${num2 - num1}`);
        break;

      case Operators.multiply:
        setNumber(`${num1 * num2}`);
        break;

      case Operators.divide:
        setNumber(`${num2 / num1}`);
        break;

      default:
        break;
    }

    setPreviousNumber('0');
  };

  return (
    <View style={styles.calculadoraContainer}>
      {previousNumber !== '0' && (
        <Text style={styles.resultadoPequeno}>{previousNumber}</Text>
      )}
      <Text
        style={styles.resultado}
        numberOfLines={1}
        adjustsFontSizeToFit={true}>
        {number}
      </Text>

      {/* Fila de botones */}
      <View style={styles.fila}>
        <ButtonCalc backgroundColor="#9B9B9B" onPress={() => clean()}>
          C
        </ButtonCalc>
        <ButtonCalc backgroundColor="#9B9B9B" onPress={negativePositive}>
          +/-
        </ButtonCalc>
        <ButtonCalc backgroundColor="#9B9B9B" onPress={removeLastNumber}>
          del
        </ButtonCalc>
        <ButtonCalc backgroundColor="#FF9427" onPress={btnDividir}>
          /
        </ButtonCalc>
      </View>

      {/* Fila de botones */}
      <View style={styles.fila}>
        <ButtonCalc onPress={() => buildNumber('1')}>1</ButtonCalc>
        <ButtonCalc onPress={() => buildNumber('2')}>2</ButtonCalc>
        <ButtonCalc onPress={() => buildNumber('3')}>3</ButtonCalc>
        <ButtonCalc backgroundColor="#FF9427" onPress={btnMultiplicar}>
          X
        </ButtonCalc>
      </View>

      {/* Fila de botones */}
      <View style={styles.fila}>
        <ButtonCalc onPress={() => buildNumber('4')}>4</ButtonCalc>
        <ButtonCalc onPress={() => buildNumber('5')}>5</ButtonCalc>
        <ButtonCalc onPress={() => buildNumber('6')}>6</ButtonCalc>
        <ButtonCalc backgroundColor="#FF9427" onPress={btnRestar}>
          -
        </ButtonCalc>
      </View>

      {/* Fila de botones */}
      <View style={styles.fila}>
        <ButtonCalc onPress={() => buildNumber('7')}>7</ButtonCalc>
        <ButtonCalc onPress={() => buildNumber('8')}>8</ButtonCalc>
        <ButtonCalc onPress={() => buildNumber('9')}>9</ButtonCalc>
        <ButtonCalc backgroundColor="#FF9427" onPress={btnSumar}>
          +
        </ButtonCalc>
      </View>

      {/* Fila de botones */}
      <View style={[styles.fila, {justifyContent: 'flex-start'}]}>
        <ButtonCalc
          style={{
            flex: 1,
          }}
          onPress={() => buildNumber('0')}>
          0
        </ButtonCalc>
        <ButtonCalc onPress={() => buildNumber('.')}>.</ButtonCalc>
        <ButtonCalc backgroundColor="#FF9427" onPress={calc}>
          =
        </ButtonCalc>
      </View>
    </View>
  );
};

export default CalculatorScreen;
