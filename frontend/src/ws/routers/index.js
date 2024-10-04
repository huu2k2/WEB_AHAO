const ROUTES = {
    AUTO: `ws://${window.location.host}:5000/PLC1/Auto`,
    MANUAL: `ws://${window.location.host}:5000/PLC1/Manual`,
    SEARCH_IP: `ws://${window.location.host}:5000/PLC1/SearchIP`,
    PUMP_1_ON: `ws://${window.location.host}:5000/PLC1/Pump1/On`,
    PUMP_1_OFF: `ws://${window.location.host}:5000/PLC1/Pump1/Off`,
    PUMP_1_SELECT: `ws://${window.location.host}:5000/PLC1/Pump1/Select`,
    PUMP_2_ON: `ws://${window.location.host}:5000/PLC1/Pump2/On`,
    PUMP_2_OFF: `ws://${window.location.host}:5000/PLC1/Pump2/Off`,
    PUMP_2_SELECT: `ws://${window.location.host}:5000/PLC1/Pump2/Select`,
    PCL1_STATUS: `ws://${window.location.host}:5000/PLC1/Pump/Stutus`,
    STATISTICS: `ws://${window.location.host}:5000/Statistics`,
};

export default ROUTES;

