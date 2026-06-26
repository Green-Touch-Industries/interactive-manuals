#!/usr/bin/env python3
import subprocess
import sys

def run_command(command, error_msg):
    print(f"\n--- Running: {command} ---")
    result = subprocess.run(command, shell=True)
    if result.returncode != 0:
        print(f"Error: {error_msg}")
        sys.exit(result.returncode)

def main():
    print("===============================================")
    print("   GREEN TOUCH INTERACTIVE MANUALS SYNC SCRIPT ")
    print("===============================================")
    
    # 1. Run Lint Checks
    run_command("npm run lint", "Lint checks failed. Please fix syntax/style errors before deploying.")
    
    # 2. Run Test Production Build
    run_command("npm run build", "Production build failed. The site is not stable. Deploy aborted.")
    
    print("\n--- Code compiles successfully and linter is clean! ---")
    
    # 3. Prompt for Commit Message
    commit_msg = input("\nEnter a description of your changes (Commit Message): ").strip()
    while not commit_msg:
        commit_msg = input("Commit message cannot be empty. Enter description: ").strip()
        
    # 4. Git Stage, Commit, and Push
    print("\n--- Staging changed files ---")
    run_command("git add .", "Failed to stage files in Git.")
    
    print(f"\n--- Committing: '{commit_msg}' ---")
    # Wrap in single quotes to escape spaces
    run_command(f'git commit -m "{commit_msg}"', "Git commit failed (no changes to commit?).")
    
    print("\n--- Pushing updates to GitHub (triggers CDN Auto-Deploy) ---")
    run_command("git push origin main", "Failed to push to GitHub. Check internet connection.")
    
    print("\n===============================================")
    print(" SUCCESS: Code synced and pushed to GitHub! ")
    print(" Vercel/Netlify auto-deployment is now building. ")
    print("===============================================")

if __name__ == "__main__":
    main()
