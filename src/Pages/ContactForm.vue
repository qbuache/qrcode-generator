<template>
  <div class="d-flex flex-column gap-3">
    <div>
      <label class="form-label d-block">Civilité</label>
      <Radio v-model="contactData.GENDER" id="GENDER.F" name="GENDER" text="Madame" value="F" />
      <Radio v-model="contactData.GENDER" id="GENDER.M" name="GENDER" text="Monsieur" value="M" />
      <Radio v-model="contactData.GENDER" id="GENDER.O" name="GENDER" text="Autre" value="O" />
    </div>
    <div class="row">
      <div class="col-lg-4">
        <Input v-model="contactData.N.firstname" name="N.firstname" text="Prénom" required />
      </div>
      <div class="col-lg-4">
        <Input v-model="contactData.N.middlename" name="N.middlename" text="Autre prénom" />
      </div>
      <div class="col-lg-4">
        <Input v-model="contactData.N.lastname" name="N.lastname" text="Nom de famille" required />
      </div>
    </div>
    <div class="row">
      <div class="col-lg-4">
        <Input
          v-model="contactData.N.honorific_prefix"
          name="N.honorific_prefix"
          text="Préfixe honorifique (Dr, etc.)"
        />
      </div>
      <div class="col-lg-4">
        <Input
          v-model="contactData.N.honorific_suffix"
          name="N.honorific_suffix"
          text="Suffixe honorifique"
        />
      </div>
      <div class="col-lg-4">
        <Input v-model="contactData.NICKNAME" name="NICKNAME" text="Surnom" />
      </div>
    </div>
    <div class="border-bottom border-2"></div>
    <div class="row">
      <div class="col-lg-4">
        <Input v-model="contactData.ORG.society" name="ORG.society" text="Société" />
      </div>
      <div class="col-lg-4">
        <Input v-model="contactData.ORG.service" name="ORG.service" text="Service" />
      </div>
      <div class="col-lg-4">
        <Input v-model="contactData.TITLE" name="TITLE" text="Profession" />
      </div>
    </div>
    <div class="border-bottom border-2"></div>
    <div class="row">
      <div class="col-lg-6">
        <Input v-model="contactData.ADR.street" name="ADR.street" text="Rue" />
      </div>
      <div class="col-lg-6">
        <Input v-model="contactData.ADR.city" name="ADR.city" text="Ville" />
      </div>
    </div>
    <div class="row">
      <div class="col-lg-4">
        <Input v-model="contactData.ADR.zip" name="ADR.zip" text="Code postal" />
      </div>
      <div class="col-lg-4">
        <Input v-model="contactData.ADR.department" name="ADR.department" text="Canton" />
      </div>
      <div class="col-lg-4">
        <Input v-model="contactData.ADR.country" name="ADR.country" text="Pays" />
      </div>
    </div>
    <div class="border-bottom border-2"></div>
    <div class="row">
      <div class="col-lg-4">
        <Input v-model="contactData.EMAIL" type="email" name="EMAIL" text="Email" />
      </div>
      <div class="col-lg-4">
        <Input
          v-model="contactData.TEL.work"
          type="tel"
          name="TEL.work"
          text="Téléphone principal"
        />
      </div>
      <div class="col-lg-4">
        <Input
          v-model="contactData.TEL.cell"
          type="tel"
          name="TEL.cell"
          text="Téléphone portable"
        />
      </div>
    </div>
    <div class="border-bottom border-2"></div>
    <Input v-model="contactData.URL" type="url" name="URL" text="Site web" />
    <Textarea v-model="contactData.NOTE" name="NOTE" text="Note" />
  </div>
</template>

<script setup>
import Input from "@/Components/Input.vue";
import Radio from "@/Components/Radio.vue";
import Textarea from "@/Components/Textarea.vue";

const contactData = defineModel();
</script>
