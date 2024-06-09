import time
from datetime import datetime

def getValue():#rajouter l'appel vers l'API
    return None
def sellAction(action,price):
    return action.price*action.number*price
def buyAction(price,number):
    return action(price,number)

class botMedian():
    def __init__(self,startValue,size,risk,timeCheck=12,minTrade=0,maxTrade=50):
        self.value = startValue
        self.timeCheck = timeCheck
        self.minTrade = minTrade
        self.maxTrade = maxTrade
        self.buffer = buffer(size)
        self.actions = []
        self.run()
        self.risk = risk

    def changeValue(self,value):
        if value < 0 and -value > self.value : return None
        self.value += value
        if value < 0 : return -value

    def run(self):
        while True:
            time.sleep(self.timeCheck)
            currentValue = getValue()
            self.buffer.addValue(currentValue)
            test = buffer.testIncrease()
            if test>self.risk:
                number = min(self.value,self.maxTrade)//currentValue
                self.value -= number*currentValue
                self.actions.append(buyAction(number))
            for action in self.actions:
                if test < 0 and action.price>currentValue:
                    self.value += sellAction(action)




class action():
    def __init__(self,price,number):
        self.number = number
        self.price = price
        self.time = datetime.now()


class buffer():
    def __init__(self,size,):
        self.size = size
        self.values = []

    def addValue(self,value):
        self.values.append(value)
        if len(self.values) > self.size:
            self.values=self.values[1:]
    def averageValue(self):
        result = 0
        for k in self.values:
            result += k
        return result / len(self.values)


    def testIncrease(self):
        lenght = len(self.values)
        result = 0
        if lenght <= 1:
            return 0
        result = self.values[-1]-self.values[-2]
        if lenght > 4:
            result += result
            result = self.values[-1]-self.values[0]
        if lenght > 10:
            result += result
            result = self.values[-1]-self.values[lenght//2]
        if lenght > 20:
            result += result
            result = self.values[-1]-self.values[lenght//4*3]
        return result