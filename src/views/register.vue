<template>
  <article class="register w-100">
    <b-container fluid class="bv-example-row h-100">
      <b-row>
        <b-col md order="2" order-md="1" class="p-3">
          <Logo />
          <div>
            <h5 class="mt-4">انضم الآن للدورة التدريبيه</h5>
            <ul class="list-unstyled stepper d-flex px-0">
              <li :class="{ active: step === 1 }"></li>
              <li :class="{ active: step === 2 }"></li>
            </ul>
          </div>

          <!-- Alert Response -->
          <b-alert
            :variant="response ? 'success' : 'danger'"
            :show="response !== null"
            >{{response ? 'تم الإرسال بنجاح' : errMessage}}</b-alert
          >

          <div class="px-4 mt-4">
            <!-- First Stepper -->
            <template v-if="this.step === 1">
              <div>
                <!-- Name -->
                <b-form-group
                  id="fieldset-1"
                  label=" الإسم * "
                  label-for="input-1"
                  :state="formState.name"
                  :invalid-feedback="invalidFeedback('name')"
                >
                  <b-form-input
                    id="input-1"
                    v-model="form.name"
                    :state="formState.name"
                    trim
                    type="text"
                  ></b-form-input>
                </b-form-group>

                <!-- Email -->
                <b-form-group
                  id="fieldset-2"
                  label=" البريد الإلكترونى * "
                  label-for="input-2"
                  :state="formState.email"
                  :invalid-feedback="invalidFeedback('email')"
                >
                  <b-form-input
                    id="input-2"
                    v-model="form.email"
                    :state="formState.email"
                    trim
                    type="email" 
                  ></b-form-input>
                </b-form-group>

                <!-- Phone -->
                <b-row class="align-items-end">
                  <b-col>
                    <b-form-group
                      id="fieldset-3"
                      label=" رقم الجوال * "
                      label-for="input-3"
                      :state="formState.phone"
                      :invalid-feedback="invalidFeedback('phone')"
                    >
                      <b-form-input
                        id="input-3"
                        v-model="form.phone"
                        :state="formState.phone"
                        trim
                        type="tel"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col col md="2">
                    <vue-country-code
                      class="w-100"
                      @onSelect="onSelect"
                      :preferredCountries="['eg', 'sa', 'qa']"
                      :ignoredCountries="['il']"
                      :disabledFetchingCountry="true"
                      :enabledCountryCode="true"
                    >
                    </vue-country-code>
                  </b-col>
                </b-row>
              </div>
            </template>

            <!-- Second Stepper -->
            <template v-if="this.step === 2">
              <div>
                <!-- stopper -->
                <b-form-group
                  label="ماهو اكبر تحد تواجهه فى رحله بحثك عن عمل؟ *"
                >
                  <b-form-radio-group
                    id="fieldset-4"
                    label-for="input-4"
                    :state="formState.stopper"
                    :invalid-feedback="invalidFeedback('stopper')"
                  >
                    <b-form-radio
                      v-for="item in stoppersArr"
                      :key="item.value"
                      v-model="form.stopper"
                      :state="formState.stopper"
                      name="stopper"
                      type="radio"
                      :value="item.value"
                    >
                      {{ item.label }}
                    </b-form-radio>
                  </b-form-radio-group>
                </b-form-group>

                <b-form-group
                  label="ماهى اكثر ميزه ترغب بتوافرها فى هذه الدورة؟ *"
                >
                  <b-form-checkbox-group
                    id="checkbox-group-2"
                    v-model="form.features"
                    name="features"
                    label=" ماهو اكبر تحد تواجهه فى رحله بحثك عن عمل؟ * "
                    label-for="checkbox-group-2"
                    :state="formState.features"
                    :invalid-feedback="invalidFeedback('features')"
                  >
                    <b-form-checkbox
                      v-for="item in featuresArr"
                      :key="item.value"
                      :value="item.value"
                      >{{ item.label }}</b-form-checkbox
                    >
                  </b-form-checkbox-group>
                </b-form-group>
              </div>
            </template>
            <div class="text-center mt-4">
              <b-button
                @click="nextStep()"
                :disabled="nextValid"
                class="btn gradient-btn"
                >التالى</b-button
              >
            </div>
          </div>
        </b-col>
        <b-col md order="1" order-md="2" class="px-0">
          <RegisterImg />
        </b-col>
      </b-row>
    </b-container>
  </article>
</template>

<script>
import RegisterImg from '../components/register-img.vue'
import Logo from '../components/logo.vue'
import Register from '@/services/register.js'
import Swal from 'sweetalert2'

const _register = new Register()

export default {
  name: 'register',
  data () {
    return {
      step: 1,
      form: {
        name: '',
        email: '',
        phone: '',
        code: '',
        stopper: '',
        features: []
      },
      formState: {
        name: null,
        email: null,
        phone: null,
        code: null,
        features: null,
        stopper: null
      },
      nextValid: true,
      errMessage: '',
      response: null,
      stoppersArr: [
        {
          label: 'تخرجت حديثا',
          value: 'new'
        },
        {
          label: 'لا يوجد خبره عمل',
          value: 'no_experience'
        },
        {
          label: 'مازال ملفي الشخصي غير مكتمل',
          value: 'lack_in_profile'
        },
        {
          label: 'قدمت فى عده شركات و لم يتواصل معى احد',
          value: 'no_company_contact'
        },
        {
          label: 'غير ذلك',
          value: 'other'
        }
      ],
      featuresArr: [
        {
          label: 'التفاعل مع المحاضر',
          value: 'feature1'
        },
        {
          label: 'تنفيذ مشروع عملى',
          value: 'feature2'
        },
        {
          label: 'الحصول على رصيد لدعم مشروعي',
          value: 'feature3'
        },
        {
          label: 'الاستشارارت',
          value: 'feature4'
        },
        {
          label: 'الحصول على ماده مسجله',
          value: 'feature5'
        },
        {
          label: 'وجود فريق العمل',
          value: 'feature6'
        },
        {
          label: 'غير ذلك',
          value: 'feature7'
        }
      ]
    }
  },
  components: {
    RegisterImg,
    Logo
  },
  methods: {
    // what about validation message?
    invalidFeedback (inputName) {
      return `please enter valid ${inputName}`
    },
    // You need to know state of every input?
    state (inputName) {
      if (this.form[inputName].length < 1) {
        this.formState[inputName] = false
        return
      }
      this.formState[inputName] = true
    },
    // how does it go if clicked next button?
    nextStep () {
      if (this.step === 1) this.step = 2
      else {
        this.form.phone = `+${this.form.code}${this.form.phone}`
        const { code, ...NEW_FORM } = this.form
        _register
          .registerForm(NEW_FORM)
          .then(response => {
            this.response = true
            // Sweetalert
            Swal.fire({
              title: 'تم بنجاح',
              icon: 'success',
              confirmButtonText: 'تم'
            })
          }).catch(error => {
            Swal.fire({
              title: error,
              icon: 'error',
              showConfirmButton: false,
              cancelButtonText: 'اغلاق',
              showCancelButton: true
            })
            this.errMessage = error
            this.response = false
          })
      }
    },
    // you search about validation method, right?
    checkForm (value) {
      if (this.step === 1) {
        if (value.name && value.email && value.phone && value.code) {
          this.nextValid = false
          return
        }
        this.nextValid = true
      } else {
        if (value.stopper && value.features.length) {
          this.nextValid = false
          return
        }
        this.nextValid = true
      }
    },
    // it handles country change.
    onSelect ({ dialCode }) {
      this.form.code = dialCode
    }
  },
  watch: {
    name () {
      this.state('name')
    },
    email () {
      this.state('email')
    },
    phone () {
      this.state('phone')
    },
    code () {
      this.state('code')
    },
    stopper () {
      this.state('stopper')
    },
    features () {
      this.state('features')
    },
    form: {
      handler (value) {
        this.checkForm(value)
      },
      deep: true
    },
    step () {
      this.checkForm(this.form)
    }
  },
  computed: {
    name () {
      return this.form.name
    },
    email () {
      return this.form.email
    },
    phone () {
      return this.form.phone
    },
    code () {
      return this.form.code
    },
    stopper () {
      return this.form.stopper
    },
    features () {
      return this.form.features
    }
  }
}
</script>

<style>
.register {
  background-color: #ffffff;
}
.stepper li {
  background-color: #ccc;
  width: 15px;
  height: 15px;
  border-radius: 10px;
  margin-inline-end: 5px;
  transition: all 0.3s linear;
  cursor: pointer;
}
.stepper li.active {
  width: 30px;
  background-color: #3b4394;
}
label,
legend {
  margin-bottom: 10px;
  font-size: 15px !important;
  font-weight: bold;
}
.gradient-btn {
  background: linear-gradient(to right, #755197, #3b4394);
  border-color: transparent;
}
.form-group {
  margin-top: 20px;
}
.form-group label {
  font-weight: normal;
}
.custom-control label {
  margin-right: 10px;
}
.vue-country-select .dropdown-list{
  max-width: 250px;
  text-align: right !important;
}
.vue-country-select .current{
  font-weight: bold;
}
.vue-country-select .current .country-code{
  margin-inline: 5px;
}
</style>
