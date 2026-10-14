{% comment %}
Required: project_name. Optional: namespace, next_change, next_commit.
Include after creating/opening the starter project and before editing its code.
Example: {% include android/en/project-start.md project_name="TicTacMenu" namespace="com.example.tictacmenu" next_change="adding Activities" %}
{% endcomment %}

{: .box-warning}
**Name the project exactly `{{ include.project_name }}`**, including capitalization. Enter this name in the **Name** field when creating the project.{% if include.namespace %} Make sure the **Package name** field contains exactly `{{ include.namespace }}`.{% endif %} **If you started with a different name, create a new project with the correct name before continuing.** Renaming an existing project can take a student 30–60 minutes; at this early stage, starting again is easier. **Before changing any code, enable Git and create an initial commit by following these steps.**

## 0. Share the project on GitHub and save the starting state
{: #git-start}

**Before {{ include.next_change | default: "the first code change" }}**, share the project on GitHub using the menu.
Sharing enables Git, creates an initial **commit** (a saved checkpoint of your code), and uploads the project to GitHub.

1. In the top bar, next to the project name `{{ include.project_name }}`, choose **Version Control → Share Project On → GitHub…**.
2. If login is required, select **Log In via GitHub** and complete the login in the browser.
3. In the sharing window, name the repository `{{ include.project_name }}`, keep the remote name `origin`, and click **Share**.
   Select **Private** if access to the repository should be restricted.
4. In the **Add Files for Initial Commit** window, make sure the project files are selected, enter a message such as `Initial {{ include.project_name }} project`, and confirm.
   Keep the `.gitignore` files created by the template; `build/`, `.gradle/`, and `local.properties` should stay out of the commit.
5. Once sharing is complete, open the GitHub repository link and check that the project files and initial commit are present.

{: .box-success}
The starting state is now saved in Git and GitHub, and you can begin changing the code. Once your change builds and runs successfully, create another commit with a message describing it{% if include.next_commit %}, for example `{{ include.next_commit }}`{% endif %}, and use **Git → Push** to update GitHub too.
