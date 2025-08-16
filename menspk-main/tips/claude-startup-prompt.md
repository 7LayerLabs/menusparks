# Claude Startup Prompt for MenuSparks

Use this prompt when starting a new Claude session for MenuSparks development:

---

We're working on **MenuSparks**, a Next.js + Tailwind project.  
Main repo: `sevenlayerlabs/menspk`  

Key project docs:  
- Product requirements: `menspk-main/menspk-main/MenuSparks_PRD.md`  
- Task list: `menspk-main/tasks/todo.md`  
- Init/setup file in repo root  

Always use these docs for context before suggesting changes.  
Right now, act as if you've just reopened the project after a break.  
1. Re-read the PRD for high-level direction.  
2. Check the todo.md for immediate priorities.  
3. Confirm next steps in plain language before making code changes.  

---

## Usage Instructions

1. Copy the prompt above
2. Paste it at the beginning of your Claude conversation
3. This ensures Claude has the proper context and follows the established workflow
4. Claude will then read the PRD and todo.md files to understand current priorities

## Benefits

- Ensures consistent project context across sessions
- Prevents Claude from making changes without understanding current priorities
- Maintains focus on the most important tasks
- Provides clear direction for next steps

