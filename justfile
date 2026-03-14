set allow-duplicate-variables
set allow-duplicate-recipes
set shell := ["bash", "-euo", "pipefail", "-c"]
set unstable

# ---------------------------------------------------------------------------- #
#                                   COMMANDS                                   #
# ---------------------------------------------------------------------------- #

# Show available commands
default:
    @just --list

# Start Astro dev server
@dev:
    na astro dev
alias d := dev

# Build for production
@build:
    na pnpm build
alias b := build

# Preview production build
@preview:
    na astro preview
alias p := preview

# ---------------------------------------------------------------------------- #
#                                    CHECKS                                    #
# ---------------------------------------------------------------------------- #

# Run all code checks
[group("checks")]
@full-check:
    just rws astro-check
    just rws oxfmt-check
    just rws prettier-check
    just rws oxlint-check
    echo ""
    echo -e '{{ GREEN }}All code checks passed!{{ NORMAL }}'
alias fc := full-check

# Run all code fixes
[group("checks")]
@full-write:
    just rws oxfmt-write
    just rws prettier-write
    just rws oxlint-write
    echo ""
    echo -e '{{ GREEN }}All code fixes applied!{{ NORMAL }}'
alias fw := full-write

# Lint with oxlint
[group("checks")]
@oxlint-check:
    na oxlint
alias oc := oxlint-check

# Run Astro type and content checks
[group("checks")]
@astro-check:
    na astro check
alias ac := astro-check

# Lint with oxlint
[group("checks")]
@oxlint-write:
    na oxlint --fix
alias ow := oxlint-write

# Check formatting with oxfmt
[group("checks")]
@oxfmt-check:
    rg --files -0 -g 'package.json' -g '.oxlintrc.json' -g '.oxfmtrc.json' -g '.prettierrc.mjs' -g 'astro.config.mts' -g 'src/**/*.ts' -g 'src/**/*.js' | xargs -0 pnpm exec oxfmt --check
alias ofc := oxfmt-check

# Format with oxfmt
[group("checks")]
@oxfmt-write:
    rg --files -0 -g 'package.json' -g '.oxlintrc.json' -g '.oxfmtrc.json' -g '.prettierrc.mjs' -g 'astro.config.mts' -g 'src/**/*.ts' -g 'src/**/*.js' | xargs -0 pnpm exec oxfmt --write
alias ofw := oxfmt-write

# Check Astro formatting with Prettier
[group("checks")]
@prettier-check:
    na prettier --check "**/*.astro"
alias pc := prettier-check

# Format Astro files with Prettier
[group("checks")]
@prettier-write:
    na prettier --write "**/*.astro"
alias pw := prettier-write

# ---------------------------------------------------------------------------- #
#                                   UTILITIES                                  #
# ---------------------------------------------------------------------------- #

# Private recipe to run a check with formatted output
@_run-with-status recipe:
    echo ""
    echo -e '{{ CYAN }}→ Running {{ recipe }}...{{ NORMAL }}'
    just {{ recipe }}
    echo -e '{{ GREEN }}✓ {{ recipe }} completed{{ NORMAL }}'
alias rws := _run-with-status
