const cameraList = [
  {
    brand: "Cakon",
    model: "ABC 3000M",
    powerConsumptionWh: 35.5,
  },
  {
    brand: "Cakon",
    model: "ABC 5000M",
    powerConsumptionWh: 37.2,
  },
  {
    brand: "Cakon",
    model: "ABC 7000M",
    powerConsumptionWh: 39.7,
  },
  {
    brand: "Cakon",
    model: "ABC 9000M",
    powerConsumptionWh: 10.9,
  },
  {
    brand: "Cakon",
    model: "ABC 9900M",
    powerConsumptionWh: 15.7,
  },
  {
    brand: "Go MN",
    model: "UIK 110C",
    powerConsumptionWh: 62.3,
  },
  {
    brand: "Go MN",
    model: "UIK 210C",
    powerConsumptionWh: 64.3,
  },
  {
    brand: "Go MN",
    model: "UIK 230C",
    powerConsumptionWh: 26.3,
  },
  {
    brand: "Go MN",
    model: "UIK 250C",
    powerConsumptionWh: 15.3,
  },
  {
    brand: "Go MN",
    model: "UIK 270C",
    powerConsumptionWh: 20.3,
  },
  {
    brand: "VANY",
    model: "CEV 1100P",
    powerConsumptionWh: 22,
  },
  {
    brand: "VANY",
    model: "CEV 1300P",
    powerConsumptionWh: 23,
  },
  {
    brand: "VANY",
    model: "CEV 1500P",
    powerConsumptionWh: 24,
  },
  {
    brand: "VANY",
    model: "CEV 1700P",
    powerConsumptionWh: 25,
  },
  {
    brand: "VANY",
    model: "CEV 1900P",
    powerConsumptionWh: 26,
  },
];

class Battery {
  constructor(batteryName, capacityAh, voltage, maxDraw, endVoltage) {
    this.batteryName = batteryName;
    this.capacityAh = capacityAh;
    this.voltage = voltage;
    this.maxDraw = maxDraw;
    this.endVoltage = endVoltage;
  }

  getCameraPower(power) {
    if (power < this.maxDraw * this.endVoltage) {
      const hours = (this.capacityAh * this.voltage) / power;
      const estHours = Math.round(hours * 10) / 10;

      this.display({
        Name: this.batteryName,
        Hours: estHours,
      });
    }
  }

  display(info) {
    const batteryInfo = document.createElement("div");
    batteryInfo.classList.add(
      "l_contents_select-item",
      "d-flex",
      "justify-content-between",
      "bg-white",
      "border",
      "fw-bold",
      "border-dark",
      "rounded",
      "p-4"
    );

    const batteryName = document.createElement("p");
    batteryName.innerHTML = info["Name"];
    const batteryHours = document.createElement("p");
    batteryHours.innerHTML = "Estimate " + info["Hours"] + " hours";

    batteryInfo.append(batteryName);
    batteryInfo.append(batteryHours);

    batteryDisplay.append(batteryInfo);
  }
}

const batteryList = [
  new Battery("WKL-78", 2.3, 14.4, 3.2, 10),
  new Battery("WKL-140", 4.5, 14.4, 9.2, 5),
  new Battery("Wmacro-78", 2.5, 14.5, 10, 5),
  new Battery("Wmacro-140", 3.6, 14.4, 14, 5),
  new Battery("IOP-E78", 6.6, 14.4, 10.5, 8),
  new Battery("IOP-E140", 9.9, 14.4, 14, 10),
  new Battery("IOP-E188", 13.2, 14.4, 14, 11),
  new Battery("RYN-C65", 4.9, 14.8, 4.9, 11),
  new Battery("RYN-C85", 6.3, 14.4, 6.3, 12),
  new Battery("RYN-C140", 9.8, 14.8, 10, 12),
  new Battery("RYN-C290", 19.8, 14.4, 14, 12),
];

const select = document.getElementById("select");
const currentBrand = document.querySelector(".select-brand");
const currentPower = document.querySelector(".select-number");
const batteryDisplay = document.getElementById("battery-display");
let currentModelList = document.getElementById(
  currentBrand.value.split(" ").join("")
);

// Enterでsubmitをする処理を無効にする
function cancelSubmit() {
  return false;
}

// inputタグの更新
function updateModelList(nextModelList) {
  currentModelList.classList.add("d-none");
  nextModelList.classList.remove("d-none");
  currentModelList = nextModelList;
}

// 値が変わるとイベントが発生する
select.addEventListener("change", () => {
  const nextModelList = document.getElementById(
    currentBrand.value.split(" ").join("")
  );
  if (currentModelList != nextModelList) {
    updateModelList(nextModelList);
  }

  // vhを解除
  if (
    document
      .querySelector(".l_contents_select-wrapper")
      .classList.contains("vh-100")
  ) {
    document
      .querySelector(".l_contents_select-wrapper")
      .classList.remove("vh-100");
  }

  // 現在表示されているバッテリーのリストを空にする
  batteryDisplay.innerHTML = "";

  const brand = currentBrand.value;
  const model = currentModelList.value;
  const power = Number(currentPower.value);
  let newPower = "";

  if (power < 0 || power > 100) return false;

  for (let i = 0; i < cameraList.length; i++) {
    if (cameraList[i]["brand"] == brand && cameraList[i]["model"] == model) {
      newPower = cameraList[i]["powerConsumptionWh"] + power;
      break;
    }
  }

  for (let i = 0; i < batteryList.length; i++) {
    batteryList[i].getCameraPower(newPower);
  }
});
