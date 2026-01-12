const API_URL = 'https://functions.poehali.dev/53c7dc6b-de17-4086-b816-bd237dd6e960';

export const api = {
  async getUser(userId: number) {
    const res = await fetch(`${API_URL}?action=get-user&user_id=${userId}`);
    return res.json();
  },

  async createUser(phone: string, firstName: string, lastName: string) {
    const res = await fetch(`${API_URL}?action=create-user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, first_name: firstName, last_name: lastName }),
    });
    return res.json();
  },

  async getCourses(userId: number) {
    const res = await fetch(`${API_URL}?action=get-courses&user_id=${userId}`);
    return res.json();
  },

  async getTasks(courseId: number, userId: number) {
    const res = await fetch(`${API_URL}?action=get-tasks&course_id=${courseId}&user_id=${userId}`);
    return res.json();
  },

  async submitAnswer(userId: number, taskId: number, answer: number) {
    const res = await fetch(`${API_URL}?action=submit-answer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, task_id: taskId, answer }),
    });
    return res.json();
  },

  async getAchievements(userId: number) {
    const res = await fetch(`${API_URL}?action=get-achievements&user_id=${userId}`);
    return res.json();
  },

  async getSchools(userId: number) {
    const res = await fetch(`${API_URL}?action=get-schools&user_id=${userId}`);
    return res.json();
  },

  async addSchool(userId: number, name: string, address: string, city: string) {
    const res = await fetch(`${API_URL}?action=add-school`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, name, address, city }),
    });
    return res.json();
  },

  async getDocuments(userId: number) {
    const res = await fetch(`${API_URL}?action=get-documents&user_id=${userId}`);
    return res.json();
  },

  async addDocument(userId: number, type: string, name: string, number: string, issueDate: string) {
    const res = await fetch(`${API_URL}?action=add-document`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, type, name, number, issue_date: issueDate }),
    });
    return res.json();
  },

  async getLeaderboard() {
    const res = await fetch(`${API_URL}?action=get-leaderboard`);
    return res.json();
  },
};
