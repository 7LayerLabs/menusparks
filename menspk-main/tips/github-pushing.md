# GitHub Pushing Guide

## Quick Reference - Daily Use

Your repository is already set up! For daily pushes, just use these 3 commands:

```bash
# 1. Stage all your changes
git add .

# 2. Commit with a descriptive message
git commit -m "Your commit message here"

# 3. Push to GitHub
git push
```

That's it! No setup needed anymore.

---

## Repository Info

- **GitHub URL**: https://github.com/sevenlayerlabs/menspk.git
- **Default Branch**: main
- **Local Folder**: C:\Users\Derek\Desktop\menspk-master

---

## Common Git Commands

### Check Status
```bash
# See what files have changed
git status

# See actual changes in files
git diff
```

### Working with Changes
```bash
# Add specific file
git add filename.tsx

# Add all changes
git add .

# Commit with message
git commit -m "Fixed pricing component"

# Push to GitHub
git push
```

### Pull Latest Changes
```bash
# Get latest code from GitHub
git pull
```

### View History
```bash
# See recent commits
git log --oneline -10
```

---

## If You Switch to a New Claude Code Session

The git setup persists! Just:
1. Navigate to folder: `cd C:\Users\Derek\Desktop\menspk-master`
2. Use normal git commands above

---

## If You Clone to Another Computer

```bash
# Clone the repository
git clone https://github.com/sevenlayerlabs/menspk.git

# Enter the folder
cd menspk

# Install dependencies
cd menspk-main
npm install
```

---

## Troubleshooting

### "Updates were rejected" Error
Someone else pushed changes. Pull first:
```bash
git pull
git push
```

### Merge Conflicts
If git pull shows conflicts:
1. Open the conflicted files
2. Look for `<<<<<<<` markers
3. Choose which version to keep
4. Remove the conflict markers
5. Stage and commit:
```bash
git add .
git commit -m "Resolved merge conflicts"
git push
```

### Forgot to Pull Before Making Changes
```bash
# Save your changes temporarily
git stash

# Pull latest
git pull

# Apply your changes back
git stash pop
```

---

## Best Practices

1. **Pull before starting work**: `git pull`
2. **Commit often**: Small, focused commits are better
3. **Write clear commit messages**: Describe what changed and why
4. **Push at end of work session**: So changes are backed up

---

## Example Daily Workflow

```bash
# Start of day
git pull

# ... make changes to code ...

# End of work session
git status                    # Check what changed
git add .                      # Stage everything
git commit -m "Updated pricing to $10/$20/$35, fixed newsletter styling"
git push                       # Push to GitHub
```

---

## Quick Copy-Paste Commands

Just copy and paste these when needed:

### Save all work and push:
```bash
git add . && git commit -m "Updates" && git push
```

### Check and push:
```bash
git status && git add . && git commit -m "Updates" && git push
```

### Pull, then push your changes:
```bash
git pull && git add . && git commit -m "Updates" && git push
```