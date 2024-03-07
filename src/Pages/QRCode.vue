<template>
  <div class="d-flex flex-column flex-grow-1 bg-light rounded py-5">
    <div
      class="d-flex flex-column flex-grow-1 justify-content-around align-items-center overflow-x-auto gap-3"
    >
      <div v-if="error" class="alert alert-warning m-0">{{ error }}</div>
      <div v-if="hideQrcode" class="d-flex flex-column align-items-center gap-3">
        <h5 class="mx-5">
          Entrer des informations <span class="d-lg-none">en haut</span
          ><span class="d-none d-lg-inline">à gauche</span> afin de générer le QR Code
        </h5>
        <i class="fa fa-fw fa-10x fa-qrcode"></i>
      </div>
      <canvas ref="refQrcodeCanvas" class="border rounded" :class="{ hideQrcode }"></canvas>
    </div>
  </div>
  <div class="d-flex flex-column gap-3 mt-3">
    <Button
      @click="downloadQrcode"
      color="btn-light border"
      fa="fa-download"
      title="Télécharger le QR Code"
      :disabled="hideQrcode"
    >
      Télécharger le QR Code
    </Button>
    <div>
      <label class="form-label d-block">Niveau de correction</label>
      <Radio
        v-model="qrcodeConfig.errorCorrectionLevel"
        id="L"
        name="errorCorrectionLevel"
        text="Bas"
        value="L"
        :disabled="hideQrcode"
      />
      <Radio
        v-model="qrcodeConfig.errorCorrectionLevel"
        id="M"
        name="errorCorrectionLevel"
        text="Moyen"
        value="M"
        :disabled="hideQrcode"
      />
      <Radio
        v-model="qrcodeConfig.errorCorrectionLevel"
        id="Q"
        name="errorCorrectionLevel"
        text="Quartile"
        value="Q"
        :disabled="hideQrcode"
      />
      <Radio
        v-model="qrcodeConfig.errorCorrectionLevel"
        id="H"
        name="errorCorrectionLevel"
        text="Haut"
        value="H"
        :disabled="hideQrcode"
      />
    </div>
    <div>
      <label class="form-label d-block">Format de l'image</label>
      <Radio
        v-model="qrcodeConfig.type"
        id="png"
        name="type"
        text="PNG"
        value="image/png"
        :disabled="hideQrcode"
      />
      <Radio
        v-model="qrcodeConfig.type"
        id="jpeg"
        name="type"
        text="JPEG"
        value="image/jpeg"
        :disabled="hideQrcode"
      />
      <Radio
        v-model="qrcodeConfig.type"
        id="webp"
        name="type"
        text="WEBP"
        value="image/webp"
        :disabled="hideQrcode"
      />
    </div>
    <Input
      v-model="qrcodeConfig.color.dark"
      name="colorDark"
      text="Partie sombre"
      type="color"
      :disabled="hideQrcode"
    />
    <Input
      v-model="qrcodeConfig.color.light"
      name="colorLight"
      text="Partie claire"
      type="color"
      :disabled="hideQrcode"
    />
    <Input
      v-model="qrcodeConfig.scale"
      max="10"
      min="1"
      name="scale"
      type="range"
      :disabled="hideQrcode"
      :text="`Échelle (1 carré noir = ${qrcodeConfig.scale}px)`"
    />
    <Input
      v-model="qrcodeConfig.margin"
      max="10"
      min="0"
      name="margin"
      type="range"
      :disabled="hideQrcode"
      :text="`Marge (${qrcodeConfig.margin}px)`"
    />
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from "vue";
import QRCode from "qrcode";
import useDownload from "@/Composables/useDownload.js";
import Button from "@/Components/Button.vue";
import Input from "@/Components/Input.vue";
import Radio from "@/Components/Radio.vue";

const props = defineProps({
  qrcodeData: String,
});

const refQrcodeCanvas = ref(null);
let error = ref(null);
let hideQrcode = ref(true);
let qrcodeConfig = reactive({
  errorCorrectionLevel: "H",
  type: "image/png",
  margin: 4,
  scale: 4,
  color: {
    dark: "#000000",
    light: "#ffffff",
  },
});

let qrcodeData = computed(() => props.qrcodeData);

function generateQrcode() {
  if (qrcodeData.value) {
    QRCode.toCanvas(
      refQrcodeCanvas.value,
      qrcodeData.value,
      {
        errorCorrectionLevel: qrcodeConfig.errorCorrectionLevel,
        margin: qrcodeConfig.margin,
        scale: qrcodeConfig.scale,
        color: {
          dark: `${qrcodeConfig.color.dark}ff`,
          light: `${qrcodeConfig.color.light}ff`,
        },
      },
      (exception) => {
        if (exception) {
          error = exception.message;
        } else {
          error = null;
          hideQrcode.value = false;
        }
      }
    );
  } else {
    hideQrcode.value = true;
  }
}

function downloadQrcode() {
  const extension = qrcodeConfig.type.split("/").slice(-1)[0];
  const data = refQrcodeCanvas.value.toDataURL(qrcodeConfig.type);
  useDownload("qrcode", extension, data);
}

watch([qrcodeConfig, qrcodeData], () => generateQrcode());
</script>

<style scoped>
.hideQrcode {
  position: absolute;
  opacity: 0;
  visibility: hidden;
}
</style>
