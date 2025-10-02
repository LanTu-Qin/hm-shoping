<template>
    <div class="count-box">
       <van-stepper :value='value' @change="onChange" />
    </div>
</template>

<script>
export default {
  name: 'countBox',
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    onChange (value) {
      this.$emit('input', value)
      event.stopPropagation()
    }
  }
}
</script>

<style>

</style>
