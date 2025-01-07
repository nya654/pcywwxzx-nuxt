<script setup>
const passwd = ref('');
const issueList = ref([]);

const backendUrl = useRuntimeConfig().public.backendUrl;
const getIssueList = async () => {
  const response = await $fetch('/api/issue', {
    query: { passwd: passwd.value },
    baseURL: backendUrl
  });
  issueList.value = response.slice(0, 32);
};
const toggleIssue = async (issueId) => {
  await $fetch(`/api/issue?passwd=${passwd.value}&id=${issueId}`, {
    method: 'POST',
    baseURL: backendUrl
  });
  getIssueList();
};
const deleteIssue = async (issueId) => {
  await $fetch(`/api/issue?passwd=${passwd.value}&id=${issueId}`, {
    method: 'DELETE',
    baseURL: backendUrl
  });
  getIssueList();
};
</script>

<template>
  <div class="min-h-full flex flex-col items-center justify-center">
    <div class="flex justify-center items-center" v-show="!issueList.length">
      <div class="join max-w-sm">
        <input type="password" class="input join-item" v-model="passwd" placeholder="PassWord" />
        <button @click="getIssueList()" class="btn btn-outline btn-secondary join-item">LOGIN</button>
      </div>
    </div>
    <div class="flex justify-center items-center" v-show="issueList.length">
      <table class="table table-sm sm:table">
        <thead>
          <tr>
            <th>姓名</th>
            <th class="hidden md:table-cell">班级</th>
            <th class="hidden xl:table-cell">学号</th>
            <th class="hidden lg:table-cell">电话</th>
            <th>日期</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <TableItem
            @toggle-issue="toggleIssue(issue.id)"
            @delete-issue="deleteIssue(issue.id)"
            v-for="issue in issueList"
            :issue="issue"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>
