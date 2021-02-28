<template>
  <div class="popup__wrapper" ref="popup_wrapper">
    <div class="popup">
      <div class="popup__header">
        <span>{{ popupModel }}</span>
        <span>
          <i class="material-icons" @click="closePopup">close</i>
        </span>
      </div>
      <div class="popup__content">
        <slot></slot>
      </div>
      <div class="popup__footer">
        <button class="close_modal" @click="closePopup">Close</button>
        <button class="submit_btn" @click="rightBtnAction">{{ rightBtnTitle }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Popup",
  props: {
    popupModel: {
      type: String,
      default: 'Popup name'
    },
    rightBtnTitle: {
      type: String,
      default: 'ok'
    }
  },
  methods: {
    closePopup() {
      this.$emit('closePopup')
    },
    rightBtnAction() {
      this.$emit('rightBtnAction')
    }
  },
  mounted() {
    let vm = this
    document.addEventListener('click', function (item) {
      if (item.target === vm.$refs['popup_wrapper']) {
        vm.closePopup()
      }
    })
  }
}
</script>

<style lang="scss">
.popup__wrapper {
  background: rgba(64, 64, 64, .4);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.popup {
  z-index: 10;
  position: fixed;
  top: 15%;
  width: 600px;
  background: #ffffff;
  box-shadow: 0 0 17px 0 #e7e7e7;
  padding: 16px;

  &__header, &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

.submit_btn {
  padding: 8px;
  color: #ffffff;
  background: #26ae68;
}

.close_modal {
  padding: 8px;
  color: #ffffff;
  background: red;
}
</style>