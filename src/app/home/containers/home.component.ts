/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';

@Component({
    templateUrl: './home.component.html',
    styles: [
        `
    .home {
        padding-top: 240px;
        text-align: center;
    }

    .btn {
        margin-top: 24px;
    }`,
    ],
})
export class HomeComponent {}
