<template>
  <el-form class="form-Login" ref="formData" :model="formData" :rules="rules" hide-required-asterisk>
    <div class="login-name">{{$config.logo}}</div>
    <el-form-item class="form-item" label="账号" prop="userName">
      <el-input class="form-ipt" v-model="formData.userName" placeholder="请输入账号" clearable></el-input>
    </el-form-item>
    <el-form-item class="form-item" label="密码" prop="password">
      <el-input class="form-ipt" v-model="formData.password" placeholder="请输入密码" clearable></el-input>
    </el-form-item>
    <el-form-item>
      <el-button class="form-item login-btn" type="primary" @click="submitForm('formData')">立即登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        formData: {
          userName: "",
          password: "",
        },
        rules: {
          userName: [{
              required: true,
              message: '请输入账号',
              trigger: 'blur'
            },
            {
              min: 6,
              max: 16,
              message: '长度在6到16个字符',
              trigger: 'blur'
            },
          ],
          password: [{
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              min: 6,
              max: 16,
              message: '长度在6到16个字符',
              trigger: 'blur'
            },
          ]
        },
      }
    },
    methods: {
      submitForm(formData) {
        console.log(this.$refs[formData].validate((valid) => {
          if (valid) {
            this.$message('登录成功')
          } else {
            this.$message('登录失败')
            return false
          }
        }));
      }
    }
  }
</script>

<style scoped>
  .form-Login {
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #ccc;
  }

  .login-name {
    height: 60px;
    font-size: 28px;
    text-align: center;
    line-height: 60px;
    border-bottom: 1px solid #ccc;
  }

  .form-item {
    width: 400px;
    margin: 20px;
    display: flex;
    justify-content: center;
  }

  .form-ipt {
    width: 340px;
  }

  .login-btn {
    width: 390px;
    margin: 0 auto;
  }
</style>