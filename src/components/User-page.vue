<template>
    <div class="user-page">
        <form 
            class="user-form"
        >
            <div class="inputs">
                <label 
                    for="name"
                    :class="$v.userData.name.$error ? 'invalid' : ''"
                >
                    Name
                </label>
                <input 
                    type="text"
                    placeholder="Name" 
                    id="name" 
                    v-model.trim="userData.name"
                    :class="$v.userData.name.$error ? 'invalid' : ''"
                >
                <small
                    v-if="$v.userData.name.$error"
                    class="helper-text invalid"
                >
                    Please enter your name (maximum 60 symbols)
                </small>
            </div>
            <div class="inputs">
                <label 
                    for="surname"
                    :class="$v.userData.name.$error ? 'invalid' : ''"
                >
                    Surname
                </label>
                <input 
                    type="text"
                    placeholder="Surname" 
                    id="surname" 
                    v-model.trim="userData.surname"
                    :class="$v.userData.surname.$error ? 'invalid' : ''"
                >
                <small
                    v-if="$v.userData.surname.$error"
                    class="helper-text invalid"
                >
                    Please enter your surname (maximum 60 symbols)
                </small>
            </div>
            <div class="inputs">
                <label 
                    for="dateOfBirth"
                    :class="$v.userData.dateOfBirth.$error ? 'invalid' : ''"
                >
                    Date of Birth
                </label>
                <input 
                    type="date"
                    max="2016-02-10"
                    placeholder="Date of Birth" 
                    id="dateOfBirth" 
                    v-model.trim="userData.dateOfBirth"
                    :class="$v.userData.dateOfBirth.$error ? 'invalid' : ''"
                >
                <small
                    v-if="$v.userData.dateOfBirth.$error"
                    class="helper-text invalid"
                >
                    Please enter your date of birth
                </small>
            </div>
            <div class="inputs">
                <label 
                    for="phone"
                    :class="$v.userData.phone.$error || wrongNumber ? 'invalid' : ''"
                >
                    Phone
                </label>
                
                <input 
                    type="tel"
                    @keypress="isNumber($event)"
                    @blur="isPhoneCorrect()"
                    id="phone"
                    :class="$v.userData.phone.$error || wrongNumber ? 'invalid' : ''"
                    v-model.trim="userData.phone"
                    maxlength="10"
                    placeholder="Phone"
                >
                
                <small
                    v-if="$v.userData.phone.$error"
                    class="helper-text invalid"
                >
                    Please enter your phone number
                </small>
                <small
                    v-else-if="wrongNumber"
                    class="helper-text invalid"
                >
                    Please enter your phone number in format 0xxyyyyyyy
                </small>
            </div>
            <div class="inputs">
                <label 
                    for="email"
                    :class="$v.userData.email.$error ? 'invalid' : ''"
                >
                    Email
                </label>
                <input 
                    type="email"
                    placeholder="Email" 
                    id="email" 
                    v-model.trim="userData.email"
                    :class="$v.userData.email.$error ? 'invalid' : ''"
                >
                <small
                    v-if="$v.userData.email.$error"
                    class="helper-text invalid"
                >
                    Please enter your email
                </small>
            </div>
            <input 
                @click="createNewUser()"
                type="button"
                class="btn"
                value="Create"
                v-if="newUser"
            >
            <input 
                @click="updateUser()"
                type="button"
                class="btn"
                value="Update"
                v-else
            >
        </form>
    </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, maxLength, email } from 'vuelidate/lib/validators';

export default {
    name: 'UserPage',
    mixins: [validationMixin],
    data() {
        return {
            userData: {
                userID: Date.now(),
                name: ``,
                surname: ``,
                dateOfBirth: ``,
                phone: ``,
                email: ``,
                id: ``,
                created: null,
                updated: null
            },
            wrongNumber: false,
            newUser: true
        }
    },
    async created() {

        let id = this.$route.params.id;
        let response = await fetch(this.$options.URLmixin);
        if(response.ok) {
            let json = await response.json();
            json.forEach(obj => {
                if(obj.userID == id) {
                    this.userData = obj;
                    this.newUser = false;
                }
            })
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    },
    methods: {
        async createNewUser() {
            this.$v.$touch()
            if(!this.$v.userData.$error){

                let d = new Date();
                this.userData.created = `${d.getDate()}.${d.getMonth()}.${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`

                try{
                    const response = await fetch(this.$options.URLmixin, {
                        method: 'POST', // или 'PUT'
                        body: JSON.stringify(this.userData),
                        headers: this.$options.headers
                    })
                    const json = await response.json();
                    console.log('Успех:', JSON.stringify(json));
                    this.returnToMainPage();
                } catch (error) {
                    console.error('Ошибка:', error);
                }
            }
        },
        async updateUser() {
            
            if(!this.$v.userData.$error) {

                let d = new Date();
                this.userData.updated = `${d.getDate()}.${d.getMonth()}.${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
                this.userData.created = null;

                try{
                    const response = await fetch(`${this.$options.URLmixin}/${this.userData.id}`, {
                        method: 'PUT', // или 'PUT'
                        body: JSON.stringify(this.userData),
                        headers: this.$options.headers
                    })
                    const json = await response.json();
                    console.log('Успех:', JSON.stringify(json));
                    this.returnToMainPage();
                } catch (error) {
                    console.error('Ошибка:', error);
                }
            }
        },
        isNumber(evt) {
            evt = (evt) ? evt : window.event;
            let charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault();
            } else {
                return true;
            }
        },
        isPhoneCorrect() {
            this.userData.phone.charAt(0) != 0 ? this.wrongNumber = true : this.wrongNumber = false;
        },
        returnToMainPage() {
            this.$router.push({ path: `/`})
        }
    },
    validations: {
        userData: {
            name: {
                required,
                maxLength: maxLength(60)
            },
            surname: {
                required,
                maxLength: maxLength(60)
            },
            dateOfBirth: {
                required,
            },
            phone: {
                required
            },
            email: {
                required,
                email
            }
        }
  }
}
</script>

<style lang="scss" scoped>

    .user-page {
        padding: 50px;
    }
    .user-form {
        width: 50%;
        margin: 0 auto;
    }
    .inputs {
        margin: 30px 0;

        label, .label {
            font-size: 18px;
            color: #000;
        }
    }
    .invalid {
        color: red !important;
    }
</style>