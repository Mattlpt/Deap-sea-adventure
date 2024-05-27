import time
from datetime import datetime

def getValue():#rajouter l'appel vers l'API
    return None

class botMedian():
    def __init__(self,startValue,timeCheck=12,minTrade=0,maxTrad=50):
        self.value = startValue
        self.timeCheck = timeCheck
        self.minTrade = minTrade
        self.maxTrade = maxTrad
        self.buffer = []
        self.actions = []
        self.run()

    def changeValue(self,value):
        if value < 0 and -value > self.value : return None
        self.value += value
        if value < 0 : return -value

    def run(self):
        while True:
            time.sleep(self.timeCheck)
    def updateBuffer(self): None



class action():
    def __init__(self,price):
        self.price = price
        self.time = datetime.now()

class buffer():
    def __init__(self,size,bufferAll=None,bufferToUnify=None):
        self.size = size
        if bufferAll is None :
            self.values = []
        self.forNext = []
    def median(self,list):
        new = []
        for k in list: new.append(k)
        new.sort()
        return new[len(new)//2]
    def addValue(self,value):
        self.values.append(value)
        while len(self) > self.size:
            self.forNext.append(self.values[0])
    def isFull(self):
        return len(self.forNext) >= self.size
    def updateBuffer(self):
        for k in self.values:
            if k is self.values[-1]:
                None