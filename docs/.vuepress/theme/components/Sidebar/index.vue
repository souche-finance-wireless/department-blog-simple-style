<template>
  <div class="sidebar">
    <div class="group__title">
          <a href="/local/configurations/" style="color: #000">关于我们</a>
    </div>
    <div class="group" v-for="sidebarGroupItem, index in sidebarItems" v-if="sidebarGroupItem">
      <div class="group__title">{{ sidebarGroupItem.title }}</div>
      <div class="group__body">

        <!-- render README.md in this folder -->
        <div v-if="sidebarGroupItem.path" :class="[
          'group__category',
          'category',
          {
            'category--selected': $route.fullPath === sidebarGroupItem.path,
            'category--active': $route.fullPath === sidebarGroupItem.path,
          }
        ]">
          <div class="category__label">
            <NavLink :to="sidebarGroupItem.path">{{ title(sidebarGroupItem.title || sidebarGroupOrder[index]) }}</NavLink>
          </div>
        </div>

        <!-- render headers of README.md in this folder -->
        <div v-if="sidebarGroupItem.headers && sidebarGroupItem.headers.length" v-for="header in sidebarGroupItem.headers" :class="[
          'group__category',
          'category',
          {
            'category--selected': $route.fullPath === `${sidebarGroupItem.to}#${header.slug}`,
            'category--active': $route.fullPath === `${sidebarGroupItem.to}#${header.slug}`,
          }
        ]">
          <div class="category__label">
            <NavLink :to="`${sidebarGroupItem.path}#${header.slug}`">{{ title(header.title) }}</NavLink>
          </div>
        </div>

        <!-- render other files in this folder -->
        <div v-if="sidebarGroupItem.children && sidebarGroupItem.children.length" v-for="child in sidebarGroupItem.children" :name="`${child.path}`" :class="[
          'group__category',
          'category',
          {
            'category--selected': !child.isLangNav && $route.path === child.path,
            'category--active': !child.isLangNav && $route.fullPath === child.path,
          }
        ]">
          <div class="category__label">
            <NavLink :to="child.path">{{ title(child.title) }}</NavLink>
          </div>
          <div v-if="child.headers && child.headers.length" v-for="header in child.headers" :class="[
            'category__headers',
            {
              'category--active': $route.fullPath === `${child.path}#${header.slug}`,
            }
          ]">
            <div class="category__header-item">
              <NavLink :to="`${child.path}#${header.slug}`">{{ title(header.title) }}</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from '../../config'
import { title } from '../../utils'
import NavLink from '../NavLink'
import { resolveSidebarItems } from './utils.js'

export default {
  name: 'Sidebar',
  components: {
    NavLink,
  },
  props: {
    items: {
      type: Object,
      required: true,
    },
  },
  computed: {
    sidebarGroupOrder() {
      const groupOrderConfig = config.get(
        this.$site,
        'sidebarGroupOrder',
        this.$localePath
      )

      const languageSelectText = config.get(this.$site, 'selectText', this.$localePath) || 'languages'

      if (groupOrderConfig) {
        const result = groupOrderConfig.slice()

        result.unshift(languageSelectText, 'home')

        return result
      } else {
        return Object.keys(this.items)
      }
    },
    sidebars() {
      return this.sidebarGroupOrder
        .map(item => {
          return this.items[item]
        })
    },
    sidebarItems () {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      )
    }
  },
  created () {
    console.log(this.sidebarItems)
  },
  methods: {
    title,
  },
}
</script>

<style lang="stylus">
@import '../../styles/_variables.styl'

.sidebar
  position: fixed
  top: 0
  bottom: 0
  width: 100%
  padding-top: 3rem
  overflow: auto
  background: $white

.group
  margin-bottom: 2rem

  &__title
    padding-left: 30px
    margin-bottom: 1em
    font-size: 18px
    font-weight: 300
    letter-spacing: 1.3px
    text-transform: uppercase
    color: #000
    font-weight: 800
    max-width 16rem

.category
  a,
  a:hover
    color: $black

  &__label,
  &__header-item
    height: 2em
    margin: 0.6em 0
    line-height: 2em

  &__label,
  &__headers
    border-left: 4px solid $white

  &__label
    padding-left: 26px

  &__headers
    display: none

  &--active,
  &--selected
    & ^[0]__headers
      display: block

  &--active &__label,
  &--active&__headers
      font-weight: 600
      border-color: $black

  &__header-item
    padding-left: 30px

    &::before
      margin-right: 4px
      color: #979797
      content: "-"
</style>
