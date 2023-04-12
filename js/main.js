// バッテリーの情報を配列として保存
const batteryInfoList = [
  {
    batteryName: "WKL-78",
    capacityAh: 2.3,
    voltage: 14.4,
    maxDraw: 3.2,
    endVoltage: 10,
  },
  {
    batteryName: "WKL-140",
    capacityAh: 4.5,
    voltage: 14.4,
    maxDraw: 9.2,
    endVoltage: 5,
  },
  {
    batteryName: "Wmacro-78",
    capacityAh: 2.5,
    voltage: 14.5,
    maxDraw: 10,
    endVoltage: 5,
  },
  {
    batteryName: "Wmacro-140",
    capacityAh: 3.6,
    voltage: 14.4,
    maxDraw: 14,
    endVoltage: 5,
  },
  {
    batteryName: "IOP-E78",
    capacityAh: 6.6,
    voltage: 14.4,
    maxDraw: 10.5,
    endVoltage: 8,
  },
  {
    batteryName: "IOP-E140",
    capacityAh: 9.9,
    voltage: 14.4,
    maxDraw: 14,
    endVoltage: 10,
  },
  {
    batteryName: "IOP-E188",
    capacityAh: 13.2,
    voltage: 14.4,
    maxDraw: 14,
    endVoltage: 11,
  },
  {
    batteryName: "RYN-C65",
    capacityAh: 4.9,
    voltage: 14.8,
    maxDraw: 4.9,
    endVoltage: 11,
  },
  {
    batteryName: "RYN-C85",
    capacityAh: 6.3,
    voltage: 14.4,
    maxDraw: 6.3,
    endVoltage: 12,
  },
  {
    batteryName: "RYN-C140",
    capacityAh: 9.8,
    voltage: 14.8,
    maxDraw: 10,
    endVoltage: 12,
  },
  {
    batteryName: "RYN-C290",
    capacityAh: 19.8,
    voltage: 14.4,
    maxDraw: 14,
    endVoltage: 12,
  },
];

// カメラの情報を配列として保存
const cameraInfoList = [
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

// モデルの情報を配列として保存
const modelInfoList = {
  Cakon: ["ABC 3000M", "ABC 5000M", "ABC 7000M", "ABC 9000M", "ABC 9900M"],
  Go_MN: ["UIK 110C", "UIK 210C", "UIK 230C", "UIK 250C", "UIK 270C"],
  VANY: ["CEV 1100P", "CEV 1300P", "CEV 1500P", "CEV 1700P", "CEV 1900P"],
};

class Option {
  // 引数を元に、option要素を作成
  static createOption(modelType, modelList) {
    const selectBox = document.createElement("select");
    selectBox.classList.add(
      "selectbox-model",
      "d-none",
      "h4",
      "border",
      "border-2",
      "border-dark",
      "p-2",
      "rounded"
    );
    selectBox.id = modelType;

    for (let i = 0; i < modelList.length; i++) {
      const option = document.createElement("option");
      option.innerHTML = modelList[i];
      option.value = modelList[i];

      selectBox.append(option);
    }

    return selectBox;
  }

  // createOptionメソッドで作成したoptionを取得した要素に入れるメソッド
  static setOption() {
    const modelBox = document.getElementById("model-box");

    for (let key in modelInfoList) {
      modelBox.append(Option.createOption(key, modelInfoList[key]));
    }
  }
}

class Battery {
  static batteryList = document.getElementById("battery-list");

  // batteryListプロパティに作成した要素を入れて、画面に表示するメソッド
  static displayBatteryInfo(batteryName, wh) {
    const batteryInfoWrap = document.createElement("li");
    batteryInfoWrap.classList.add(
      "battery-item",
      "d-flex",
      "justify-content-between",
      "bg-white",
      "border",
      "fw-bold",
      "border-dark",
      "rounded",
      "p-4"
    );

    const nameWrap = document.createElement("p");
    nameWrap.innerHTML = batteryName;

    const whWrap = document.createElement("p");
    whWrap.innerHTML = "Estimate " + wh + " hours";

    batteryInfoWrap.append(nameWrap);
    batteryInfoWrap.append(whWrap);

    Battery.batteryList.append(batteryInfoWrap);
  }

  // batteryInfoListの各要素のエネルギーが、与えられたカメラの消費電力を上回っているか確認するメソッド
  static checkCompatibility(power) {
    for (let i = 0; i < batteryInfoList.length; i++) {
      const mAh = batteryInfoList[i].maxDraw * batteryInfoList[i].endVoltage;

      if (power < mAh) {
        const wh =
          (batteryInfoList[i].capacityAh * batteryInfoList[i].voltage) / power;
        const roundedWh = Math.round(wh * 10) / 10;

        Battery.displayBatteryInfo(batteryInfoList[i].batteryName, roundedWh);
      }
    }
  }

  // 現在入力されている情報とcameraInfoListの情報を元に、エネルギーを計算するメソッド
  static calculateTotalPower() {
    const currentBrand = document
      .getElementById("select-brand")
      .value.split("_")
      .join(" ");
    const currentModel = document.getElementById(
      document.getElementById("select-brand").value
    ).value;
    const currentPower = document.getElementById("input-power").value;

    for (let i = 0; i < cameraInfoList.length; i++) {
      if (
        cameraInfoList[i]["brand"] == currentBrand &&
        cameraInfoList[i]["model"] == currentModel
      ) {
        return cameraInfoList[i]["powerConsumptionWh"] + Number(currentPower);
      }
    }
  }

  // バッテリーリストを更新するための処理を行うメソッド
  static updateBatteryList() {
    // 現在のバッテリーのリストを削除
    Battery.batteryList.innerHTML = "";

    const totalPower = Battery.calculateTotalPower();

    Battery.checkCompatibility(totalPower);
  }
}

class Model {
  // 現在選択されているブランドに対応しているモデルのセレクトボックスを表示するメソッド
  static updateModelBox(brand) {
    const selectboxBrand = document.getElementById(brand);
    selectboxBrand.classList.remove("d-none");
  }

  // モデルのセレクトボックスを全て日表示するメソッド
  static resetModelBoxClass() {
    const selectBoxModel = document.querySelectorAll(".selectbox-model");

    for (let i = 0; i < selectBoxModel.length; i++) {
      selectBoxModel[i].classList.add("d-none");
    }
  }

  // ブランドが変わった際のイベント処理を行うメソッド
  static changeBrand() {
    const brand = document.getElementById("select-brand");

    brand.addEventListener("change", function () {
      if (brand.value == "-") {
        Battery.batteryList.innerHTML = "";
        Model.resetModelBoxClass();
      } else {
        Model.resetModelBoxClass();
        Model.updateModelBox(brand.value);

        Battery.updateBatteryList();
      }
    });
  }

  // モデルが変わった際のイベント処理を行うメソッド
  static changeModel() {
    const selectBoxModel = document.querySelectorAll(".selectbox-model");

    for (let i = 0; i < selectBoxModel.length; i++) {
      selectBoxModel[i].addEventListener("change", function () {
        Battery.updateBatteryList();
      });
    }
  }
}

class Power {
  // パワーが変わった際のイベント処理を行うメソッド
  static changePower() {
    const brand = document.getElementById("select-brand");
    const power = document.getElementById("input-power");

    power.addEventListener("change", function () {
      if (brand.value == "-") {
        alert("ブランドを選択してください。");
        power.value = "0";
        return false;
      } else if (Number(power.value) < 0 || Number(power.value) > 100) {
        alert("0-100までの数字を入力してください。");
        power.value = "0";
        return false;
      } else {
        Battery.updateBatteryList();
      }
    });
  }
}

Option.setOption();
Model.changeBrand();
Model.changeModel();
Power.changePower();
