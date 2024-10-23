const ROUTES = {
    IP: "ws://localhost:5000",
    AUTO: `ws://localhost:5000/PLC1/Auto`,
    MANUAL: `ws://localhost:5000/PLC1/Manual`,
    SEARCH_IP: `ws://localhost:5000/PLC1/SearchIP`,
    PUMP_1_ON: `ws://localhost:5000/PLC1/Pump1/On`,
    PUMP_1_OFF: `ws://localhost:5000/PLC1/Pump1/Off`,
    PUMP_1_SELECT: `ws://localhost:5000/PLC1/Pump1/Select`,
    PUMP_2_ON: `ws://localhost:5000/PLC1/Pump2/On`,
    PUMP_2_OFF: `ws://localhost:5000/PLC1/Pump2/Off`,
    PUMP_2_SELECT: `ws://localhost:5000/PLC1/Pump2/Select`,
    PCL1_STATUS: `ws://localhost:5000/PLC1/Pump/Stutus`,
    STATISTICS: `ws://localhost:5000/Statistics`,
};

export default ROUTES;

