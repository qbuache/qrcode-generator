<template>
  <div class="d-flex flex-column flex-grow-1 rounded-0">
    <header class="bg-custom shadow-sm p-3">
      <h5 class="text-white d-flex flex-row align-items-center gap-2 m-0">
        <i class="fa fa-fw fa-lg fa-qrcode"></i>
        <span>{{ env.VITE_APP_NAME }}</span>
      </h5>
    </header>
    <div class="d-flex flex-column flex-grow-1 p-3">
      <ul class="nav nav-underline mb-3">
        <li class="nav-item position-relative">
          <a
            @click="qrcodeType = 'text'"
            class="nav-link"
            href="#text"
            :class="{ active: qrcodeType == 'text' }"
            >URL / Texte</a
          >
        </li>
        <li class="nav-item position-relative">
          <a
            @click="qrcodeType = 'contact'"
            class="nav-link"
            href="#contact"
            :class="{ active: qrcodeType == 'contact' }"
            >Contact (vCard)</a
          >
        </li>
      </ul>
      <div class="row d-flex flex-grow-1">
        <div class="col-lg-6 px-3 col-border-end">
          <TextForm v-if="qrcodeType == 'text'" v-model="textData" />
          <div v-if="qrcodeType == 'contact'" class="d-flex flex-column gap-3">
            <ContactForm v-model="contactData" />
            <Button
              v-if="displayVCardDownload"
              @click="downloadVCard"
              color="btn-light border"
              fa="fa-download"
              title="Télécharger la vCard"
            >
              Télécharger la vCard
            </Button>
          </div>
        </div>
        <div class="col-lg-6 px-3 d-flex flex-column col-border-start mt-3 mt-lg-0">
          <QRCode :qrcodeData />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import dayjs from "dayjs";
import useDownload from "@/Composables/useDownload.js";
import Button from "@/Components/Button.vue";
import TextForm from "@/Pages/TextForm.vue";
import ContactForm from "@/Pages/ContactForm.vue";
import QRCode from "@/Pages/QRCode.vue";

const env = import.meta.env;

const contactData = ref({
  ADR: {
    street: "",
    city: "",
    department: "",
    zip: "",
    country: "",
  },
  GENDER: "F",
  KIND: "individual",
  N: {
    lastname: "",
    firstname: "",
    middlename: "",
    honorific_prefix: "",
    honorific_suffix: "",
  },
  ORG: {
    society: "",
    service: "",
  },
  TEL: {},
});
const displayVCardDownload = ref(false);
const qrcodeType = ref("text");
const textData = ref("");

let vCard = "";

const qrcodeData = computed(() => {
  switch (qrcodeType.value) {
    case "contact":
      return createVCard(contactData.value);
    case "text":
      return textData.value;
  }
});

function createVCard(contact) {
  if (contact.N.firstname && contact.N.lastname) {
    displayVCardDownload.value = true;
    let ADR = "";
    if (Object.values(contact.ADR).some((value) => value != "")) {
      ADR = `ADR;WORK:;;${contact.ADR.street};${contact.ADR.city};${contact.ADR.department};${contact.ADR.zip};${contact.ADR.country}\n`;
    }

    const EMAIL_WORK = contact.EMAIL ? `EMAIL;WORK:${contact.EMAIL}\n` : "";
    const FN = `${contact.N.firstname} ${contact.N.lastname}\n`;
    const N = `${contact.N.lastname};${contact.N.firstname};${contact.N.middlename};${contact.N.honorific_prefix};${contact.N.honorific_suffix}\n`;

    let ORG = "";
    if (Object.values(contact.ORG).some((value) => value != "")) {
      ORG = `ORG:${contact.ORG.society};${contact.ORG.service}\n`;
    }

    const TEL_WORK = contact.TEL.work ? `TEL;WORK:${contact.TEL.work}\n` : "";
    const TEL_CELL = contact.TEL.cell ? `TEL;CELL:${contact.TEL.cell}\n` : "";

    vCard = "BEGIN:VCARD\n";
    vCard += ADR;
    vCard += EMAIL_WORK;
    vCard += `FN:${FN}`;
    vCard += dataOrEmpty(contact, "GENDER");
    vCard += "KIND:individual\n";
    vCard += `N:${N}`;
    vCard += dataOrEmpty(contact, "NICKNAME");
    vCard += dataOrEmpty(contact, "NOTE");
    vCard += ORG;
    vCard += "REV:" + dayjs().format("YYYYMMDDTHHmmss[Z]") + "\n";
    vCard += dataOrEmpty(contact, "ROLE");
    vCard += TEL_WORK;
    vCard += TEL_CELL;
    vCard += dataOrEmpty(contact, "TITLE");
    vCard += dataOrEmpty(contact, "URL");
    vCard += "VERSION:4.0\n";
    vCard += "END:VCARD";
    return vCard;
  } else {
    displayVCardDownload.value = false;
  }
}

function dataOrEmpty(data, key) {
  return data[key] ? `${key}:${data[key]}\n` : "";
}

function downloadVCard() {
  const data = "data:text/vcard;charset=utf-8," + encodeURIComponent(vCard);
  useDownload("vcard", "vcf", data);
}
</script>
